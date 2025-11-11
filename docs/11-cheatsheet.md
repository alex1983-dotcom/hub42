# Шпаргалка

```bash
runserver          python manage.py runserver
makemigrations     python manage.py makemigrations <app>
migrate            python manage.py migrate
createsuperuser    python manage.py createsuperuser
shell              python manage.py shell
dumpdata           python -X utf8 manage.py dumpdata <app> --indent 2 -o fixtures/x.json
loaddata           python manage.py loaddata fixtures/x.json
collectstatic      python manage.py collectstatic --noinput
requirements       pip-compile requirements/base.in
git tag            git tag -a v1.2 -m "changelog" && git push --tags
```

