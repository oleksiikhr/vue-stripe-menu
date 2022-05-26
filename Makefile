up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f app

sh:
	docker-compose exec app sh

build:
	docker-compose run app pnpm run build

build-docs:
	docker-compose run app pnpm run build:docs

lint:
	docker-compose exec app pnpm lint:fix

eslint:
	docker-compose exec app pnpm eslint:fix

prettier:
	docker-compose exec app pnpm prettier:fix

stylelint:
	docker-compose exec app pnpm stylelint:fix

test:
	docker-compose exec app pnpm test
