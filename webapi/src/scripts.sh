echo Requesting all heroes
curl http://localhost:3000/heroes

echo Flash requesting
curl http://localhost:3000/heroes/1

echo Requesting with wrong body
curl --silent -X POST \
    --data-binary '{"invalid": "data"}' \
    localhost:3000/heroes

echo Requesting with correct body
curl --silent -X POST \
    --data-binary '{"name": "Testing", "age": 23, "powers": ["Super Tester"]}' \
    localhost:3000/heroes

echo Deleting a existing hero
curl --silent -X DELETE \
    localhost:3000/heroes/1765983641189

echo Deleting a unknowed hero
curl --silent -X DELETE ^
    localhost:3000/heroes/67869
