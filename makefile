.PHONY: migrate
migrate:
	npx prisma migrate dev --name init --schema server/prisma/schema.prisma
.PHONY: generate
generate:
	npx prisma generate --schema server/prisma/schema.prisma
.PHONY: build
build:
	bun run build
.PHONY: server
server:
	export NODE_ENV=production && bun run server
.PHONY: dev
dev:
	export NODE_ENV=dev && bun run server
.PHONY: studio
studio:
	npx prisma studio --schema server/prisma/schema.prisma
