package routes

import (
	"github.com/a-paudel/link_shortener/models"
	"github.com/labstack/echo/v4"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
)

func RegisterLinkRoutes(app *echo.Echo) {
	router := app.Group("")

	router.GET("", createLinkPageGet)
	router.POST("", createLinkPagePost)
	router.GET("/:code", redirectLinkPage)
	router.GET("/:code/view", viewLinkPage)
}

// create page
type createInput struct {
	Url string `form:"url"`
}

func createLinkPageGet(c echo.Context) error {
	errors := c.QueryParams()["error"]

	data := map[string]interface{}{
		"errors": errors,
	}

	return c.Render(200, "create", data)
}
func createLinkPagePost(c echo.Context) error {
	var input createInput
	err := c.Bind(&input)
	if err != nil {
		url := c.Echo().URL(createLinkPageGet)
		url = url + "?error=Invalid input"
		return c.Redirect(302, url)
	}

	var link models.Link
	err = link.Create(input.Url)
	if err != nil {
		url := c.Echo().URL(createLinkPageGet)
		url = url + "?error=" + cases.Title(language.English).String(err.Error())
		return c.Redirect(302, url)
	}
	url := "/" + link.Code + "/view"
	return c.Redirect(302, url)
}

// view page
func viewLinkPage(c echo.Context) error {
	code := c.Param("code")
	var link models.Link
	err := models.DB.Where("code = ?", code).First(&link).Error
	if err != nil {
		url := "/?error=Link not found"
		return c.Redirect(302, url)
	}

	var data = map[string]interface{}{
		"link":  link,
		"short": c.Request().Host + "/" + link.Code,
	}

	return c.Render(200, "view", data)
}

// redirect page
func redirectLinkPage(c echo.Context) error {
	code := c.Param("code")
	var link models.Link
	err := models.DB.Where("code = ?", code).First(&link).Error
	if err != nil {
		println("this is happebning")
		url := "/?error=Link not found"
		return c.Redirect(302, url)
	}
	return c.Redirect(301, link.Url)
}
