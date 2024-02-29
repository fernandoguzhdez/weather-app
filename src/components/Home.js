import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';

function Home() {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState([]);
  const [nameCity, setNameCity] = useState(null);

  const handleSearch = async () => {
    try {
      // Realizar la solicitud a la API de Reservamos para obtener las coordenadas
      const response = await fetch(`https://search.reservamos.mx/api/v2/places?q=${city}`);
      const data = await response.json();
      const { lat, long, display } = data[0]; // Suponiendo que la primera coincidencia sea la ciudad buscada
      setNameCity(display)

      // Realizar la solicitud a la API de OpenWeather para obtener el pronóstico del tiempo
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=0eebd1fcf852d29ca0340c5c451d4c9a&units=metric`);
      const weatherData = await weatherResponse.json();

      // Extraer y almacenar la temperatura máxima y mínima para los próximos 5 días
      const forecastData = weatherData.list.map(item => ({
        date: item.dt_txt,
        maxTemp: item.main.temp_max.toFixed(0),
        minTemp: item.main.temp_min.toFixed(0)
      }));

    
      setForecast(forecastData);
      console.log(forecast)

    } catch (error) {
      console.error('Error al buscar el pronóstico del tiempo:', error);
    }
  };

  return (
    <div style={{margin: 20}}>
      <Form style={{justifyContent: 'center', textAlign: 'center'}}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control placeholder="Ingresa la ciudad" type="text" style={{ marginBottom: 10}}  value={city} onChange={(e) => setCity(e.target.value)} />
          <Button onClick={handleSearch} style={{ width: '50%'}}>Buscar</Button>
        </Form.Group>
      </Form>

      
      <div style={{ flex: 1, width: '100%', justifyContent: 'center' }}>
        <h2 style={{textAlign: 'center'}}>{nameCity}</h2>
        <Row>
          {forecast.map((day, index) => (
            <Col md={4} key={index}>
              <Card style={{ margin: 10, textAlign: 'center' }}>
                <Card.Body>
                  <Card.Text>
                    <strong>{day.date}</strong>
                    <p>{day.maxTemp}°C / {day.minTemp}°C</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;