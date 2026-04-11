FROM ruby:4.0.2

WORKDIR /app

RUN apt-get update -qq && apt-get install -y postgresql-client

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

EXPOSE 3000
