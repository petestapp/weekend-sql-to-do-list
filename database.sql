CREATE DATABASE weekend_to_do_app;

CREATE TABLE "tasks"(
	id serial primary key,
	task text,
	complete boolean
);
