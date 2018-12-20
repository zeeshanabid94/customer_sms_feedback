cd emotive
python manage.py migrate
cd ..
cd frontend
npm install
npm run build
cd ..
cd emotive
python manage.py collectstatic