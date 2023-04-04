package routes

import (
	"io"

	"github.com/a-paudel/link_shortener/models"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func RegisterLinkRoutes(app *echo.Echo) {
	var router = app.Group("/api/links")
	router.Use(middleware.RateLimiter(middleware.NewRateLimiterMemoryStore(2)))

	router.POST("", createCode)
	router.GET("/:id", getUrl)
}

func createCode(c echo.Context) error {
	var bodyBytes, err = io.ReadAll(c.Request().Body)
	if err != nil {
		return c.String(400, "Invalid URL")
	}
	var url = string(bodyBytes)
	println(url)

	var link = models.Link{}
	err = link.Create(url)
	if err != nil {
		return c.String(500, err.Error())
	}
	return c.JSON(200, link)
}

func getUrl(c echo.Context) error {
	var id = c.Param("id")
	var link = models.Link{}
	err := link.Get(id)
	if err != nil {
		return c.String(404, "Not Found")
	}
	return c.JSON(200, link)
}
