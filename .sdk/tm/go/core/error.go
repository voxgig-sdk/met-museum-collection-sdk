package core

type MetMuseumCollectionError struct {
	IsMetMuseumCollectionError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMetMuseumCollectionError(code string, msg string, ctx *Context) *MetMuseumCollectionError {
	return &MetMuseumCollectionError{
		IsMetMuseumCollectionError: true,
		Sdk:              "MetMuseumCollection",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MetMuseumCollectionError) Error() string {
	return e.Msg
}
