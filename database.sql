CREATE DATABASE weekend-to-do-app;

CREATE TABLE "tasks"(
	id serial primary key,
	task text,
	complete boolean
);