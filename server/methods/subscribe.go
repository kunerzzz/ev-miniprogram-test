package methods

import (
	"bytes"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"

	"github.com/gin-gonic/gin"
	randstr "github.com/gohouse/random"
)

type PostSubscribeRequestBody struct {
	ID string `json:"id" binding:"required"`
}

type KeyType int

const (
	ThingKey KeyType = iota
	NameKey
	DateKey
	TimeKey
)

func genThingValue() string {
	return randstr.RandString(10)
}

func genNameValue() string {
	return randstr.RandCapital(5)
}

func genDateValue() string {
	return fmt.Sprintf("%4d-%02d-%02d", rand.Intn(1000) + 1000, rand.Intn(12) + 1, rand.Intn(28) + 1)
}

func genTimeValue() string {
	return fmt.Sprintf("%02d:%02d", rand.Intn(24), rand.Intn(60))
}

func genValue(t KeyType) string {
	switch t {
	case ThingKey:
		return genThingValue()
	case NameKey:
		return genNameValue()
	case DateKey:
		return genDateValue()
	case TimeKey:
		return genTimeValue()
	default:
		panic("Strange KeyType")
	}
}

func (handler *HttpHandlersImpl)PostSubscribe(c *gin.Context) {
	HomeworkKeys := map[string]KeyType {
		"thing9": ThingKey,
		"name10": NameKey,
		"thing12": ThingKey,
		"date14": DateKey,
		"time20": TimeKey,
	}
	HomeworkTemplateID := "wI8nr01hBcKL3t6-acQc5GXPYUSrVxlqN5EK8ve-osk"

	DakaKeys := map[string]KeyType {
		"thing1": ThingKey,
		"name6": NameKey,
		"thing15": ThingKey,
		"thing5": ThingKey,
		"thing18": ThingKey,
	}
	DakaTemplateID := "QAvkh3v8H5oSuZXk0TLL32JVHX-0kCkukiJsv4SkVYA"

	h := WXHeader{}
	if handler.NeedWX {
		if err := c.ShouldBindHeader(&h);err != nil {
			c.JSON(http.StatusNetworkAuthenticationRequired, gin.H{
				"message": "No Wechat info",
			})
			return
		}
	}

	body := PostSubscribeRequestBody{}
	if err := c.ShouldBind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Bad Request",
		})
		return
	}

	var keys map[string]KeyType
	var templateId string

	switch c.Param("template") {
	case "homework":
		keys = HomeworkKeys
		templateId = HomeworkTemplateID
	case "daka":
		keys = DakaKeys
		templateId = DakaTemplateID
	default:
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Template not found",
		})
		return
	}

	data := make(map[string]string)
	for k, v := range keys {
		data[k] = genValue(v)
	}

	reqBody := map[string]interface{}{
		"touser": h.OpenID,
		"template_id": templateId,
		"page": "/subscribe/subscribe",
		"data": data,
		"miniprogram_state": "developer",
	}
	j, err:= json.Marshal(reqBody)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "JSON marshal error",
		})
		fmt.Printf("JSON marshal error: %#v", err)
		return
	}
	
	url := fmt.Sprintf("https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=%s", h.AccessToken)
	
	fmt.Printf("POST API: %s\n", url)
	fmt.Println(string(j))
	
	if handler.NeedWX {
		reader := bytes.NewReader(j)
		resp, err := http.Post(url, "application/json", reader)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Error when sending request to wx",
			})
			return
		}
		
		decoder := json.NewDecoder(resp.Body)
		defer resp.Body.Close()
		wxResp := WXResp{}
		decoder.Decode(&wxResp)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Error when parsing response body from wx",
			})
			return
		}
		if wxResp.ErrCode != 0 {
			msg := fmt.Sprintf("API Response Error: [%d]%s", wxResp.ErrCode, wxResp.ErrMsg)		
			c.JSON(http.StatusOK, gin.H{
				"message": msg,	
			})
			return
		}
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "OK",
		"success": true,
	})
}
