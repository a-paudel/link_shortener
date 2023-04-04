package main

import (
	"net/http"

	"embed"

	"github.com/a-paudel/link_shortener/models"
	"github.com/a-paudel/link_shortener/routes"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

//go:embed all:.embedded/client/*
var clientFiles embed.FS

func registerClientFiles(app *echo.Echo) {

	// app.StaticFS("/", echo.MustSubFS(clientFiles, ".embedded/client"))
	app.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Filesystem: http.FS(echo.MustSubFS(clientFiles, ".embedded/client")),
		Root:       "/",
		// Browse:     true,
		HTML5: true,
	}))

}

func main() {
	defer models.DB.Close()

	var app = echo.New()

	app.Pre(middleware.RemoveTrailingSlash())
	app.Use(middleware.LoggerWithConfig(
		middleware.LoggerConfig{
			Format: "${method}\t|\t${uri}\t|\t${status}\n",
		},
	))
	app.Use(middleware.Recover())
	app.Use(middleware.CORS())
	// app.Use(middleware.Secure())
	app.Use(middleware.Gzip())
	app.Use(middleware.BodyLimit("1K"))

	routes.RegisterLinkRoutes(app)
	registerClientFiles(app)

	app.Start(":8000")
}
