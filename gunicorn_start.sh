#!/bin/bash

NAME="westend_app"
DJANGODIR=/var/www/westend-Corporation/backend
USER=www-data
GROUP=www-data
WORKERS=3
BIND=127.0.0.1:8000
DJANGO_SETTINGS_MODULE=backend.settings
DJANGO_WSGI_MODULE=backend.wsgi
LOGLEVEL=info

cd $DJANGODIR
source venv/bin/activate

export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH

exec venv/bin/gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $WORKERS \
  --user=$USER \
  --group=$GROUP \
  --bind=$BIND \
  --log-level=$LOGLEVEL
