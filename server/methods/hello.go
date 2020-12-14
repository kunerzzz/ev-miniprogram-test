package methods

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type PostHelloRequestBody struct {
	Name string `json:"name" binding:"required"`
}

func (handler *HttpHandlersImpl) GetHello(c *gin.Context) {
	h := WXHeader{}

	if handler.NeedWX {
		if err := c.ShouldBindHeader(&h);err != nil {
			c.JSON(http.StatusNetworkAuthenticationRequired, gin.H{
				"message": "No Wechat info",
			})
			return
		}
	}

	c.JSON(200, gin.H{
		"message": "Hello miniprogram!",
		"appid": h.AppID,
		"openid": h.OpenID,
	})
}

func (handler *HttpHandlersImpl) PostHello(c *gin.Context) {
	h := WXHeader{}
	
	if handler.NeedWX {
		if err := c.ShouldBindHeader(&h);err != nil {
			c.JSON(http.StatusNetworkAuthenticationRequired, gin.H{
				"message": "No Wechat info",
			})
			return
		}
	}

	body := PostHelloRequestBody{}
	if err := c.ShouldBind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Bad Request",
		})
		return
	}

	msg := fmt.Sprintf("Hello %s!", body.Name)

	c.JSON(200, gin.H{
		"message": msg,
		"appid": h.AppID,
		"openid": h.OpenID,
	})
}