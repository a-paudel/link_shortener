package main

import (
	"link_shortener/models"
	"link_shortener/routes"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	defer models.DB.Close()

	var app = echo.New()
	app.Pre(middleware.RemoveTrailingSlash())
	app.Use(middleware.Logger())
	app.Use(middleware.Recover())
	app.Use(middleware.CORS())
	// app.Use(middleware.Secure())
	app.Use(middleware.Gzip())
	app.Use(middleware.BodyLimit("1K"))

	routes.RegisterLinkRoutes(app)

	app.Start(":8000")
}
