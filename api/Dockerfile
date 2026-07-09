FROM golang:1.26-alpine AS builder

WORKDIR /build
RUN apk add --no-cache git ca-certificates

COPY spencer-ting /build
COPY via-jeri/appkit /via-jeri/appkit

WORKDIR /build/api
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o /out/server ./cmd/server

FROM alpine:3.20

RUN apk add --no-cache ca-certificates
WORKDIR /app

COPY --from=builder /out/server /app/server
COPY spencer-ting/api/config/config.docker.yaml /app/config/config.yaml
COPY spencer-ting/api/migrations /app/migrations

ENV SPENCER_TING_CONFIG=/app/config/config.yaml

EXPOSE 8080 50051

CMD ["/app/server"]
