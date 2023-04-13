package main

import (
	"html/template"
	"io"
	"io/fs"
	"strings"

	"github.com/a-paudel/link_shortener/routes"
	"github.com/a-paudel/link_shortener/templates"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type EchoTemplate struct {
	templates map[string]*template.Template
}

func (t *EchoTemplate) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates[name].ExecuteTemplate(w, "base.html", data)
}

func registerTemplates(app *echo.Echo) {
	embeddedFiles := templates.EmbeddedHtml
	subDir, err := fs.Sub(embeddedFiles, "www")
	if err != nil {
		println("Could not open embedded files")
		panic(err)
	}

	templates := make(map[string]*template.Template)
	fs.WalkDir(subDir, ".", func(path string, d fs.DirEntry, err error) error {
		if d.IsDir() {
			return nil
		}
		if d.Name() == "base.html" {
			return nil
		}
		name := strings.TrimSuffix(path, ".html")

		fileTemplate := template.Must(template.ParseFS(subDir, path, "base.html"))
		templates[name] = fileTemplate
		return nil
	})

	echoTemplate := &EchoTemplate{
		templates: templates,
	}
	app.Renderer = echoTemplate
}

func startServer() {
	app := echo.New()
	app.Pre(middleware.RemoveTrailingSlash())
	app.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${time_rfc3339}\t${status}\t${method}\t${latency_human}\t${uri}\n",
	}))
	app.Use(middleware.Recover())

	registerTemplates(app)
	routes.RegisterLinkRoutes(app)

	app.Start(":8000")
}
