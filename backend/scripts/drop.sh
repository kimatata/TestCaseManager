#!/bin/bash

npx sequelize db:migrate:undo:all
echo "Dropped 'Project' table."
