package main

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/kunerzzz/ev-miniprogram-test/server/methods"
)

func main() {
	app := gin.Default()

	handler := new(methods.HttpHandlersImpl)

	handler.NeedWX = false
	if len(os.Args) >= 2 && os.Args[1] == "wx" {
		handler.NeedWX = true
	}

	app.GET("/hello", handler.GetHello)
	app.POST("/hello", handler.PostHello)

	app.Run(":80")
}