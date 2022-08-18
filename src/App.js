import React, { useState, useEffect } from 'react';
import {Button, Alert} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from './logo.svg';
import connectedGnome from './connected_gnome.jfif';
import disconnectedGnome from './disconnected_gnome.jfif';
import breakdancingGnome from './images/gnomes/breakdancing_gnome.jfif'
import './App.css';
import io from 'socket.io-client';

const socket = io('localhost:3001');

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);
  const [connectedGnomePicture, setConnectedGnomePicture] = useState(disconnectedGnome);
  const [connectedGnomeText, setConnectedGnomeText] = useState(<p>Loading...</p>);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      setConnectedGnomePicture(connectedGnome);
      setConnectedGnomeText("connected ;)");
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
      setConnectedGnomeText(<p>AUGH! disconnected.</p>);
      setConnectedGnomePicture(disconnectedGnome);
    });
    socket.on('message', data => {
      setLastMessage(data);
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('hello!');
  }

  return (
    <Container fluid>
      <Row>
        <Alert variant = 'primary'>Alert!!! WEE WOO WEE WOO</Alert>
        <h1>Welcome to <span className = 'rainbow-text'>SPINTHEGNO.ME</span></h1>
      </Row>
      <Row>
        <img src={breakdancingGnome} className="Spinning-gnome" alt="logo"/>
      </Row>
      <Row>
        {connectedGnomeText}
        <img src = {connectedGnomePicture} width = '10%'/>
      </Row>
      <Row>
        <Col md = {8}>
          <p>Last message: { lastMessage || '-' }</p>
        </Col>
      <Col md = {1}>
        <Button onClick={ sendMessage }>Say hello!</Button>
      </Col>
      </Row>
    </Container>
  );
}

export default App;
