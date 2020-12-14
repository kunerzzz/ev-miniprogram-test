FROM golang:alpine AS build

RUN mkdir /app
COPY . /app
WORKDIR /app
RUN go build -o server

###
FROM alpine AS final
COPY --from=build /app/server /
CMD ["/server", "wx"]