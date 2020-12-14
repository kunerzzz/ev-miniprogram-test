package methods

type HttpHandlersImpl struct {
	NeedWX bool
}

type WXHeader struct {
	OpenID string `header:"X-WX-OPENID" binding:"required"`
	AppID string `header:"X-WX-APPID" binding:"required"`
	AccessToken string `header:"X-WX-CLOUDBASE-ACCESS-TOKEN" binding:"required"`
}