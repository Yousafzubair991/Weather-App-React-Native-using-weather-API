import * as React from 'react';
import { ImageBackground, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const apiURL =''; //Paste your weather API URL here 
const image = { uri: 'https://wallpapercave.com/wp/wp7353589.jpg' };
export default class App extends React.Component {
  state = {
    isLoaded: false,
    weatherData: {},
  };
  componentDidMount() {
    this.getWeatherData();
  }
  //Fetch weather details from API
  getWeatherData() {
    return fetch(apiURL)
      .then((data) => data.json())
      .then((dataJSON) =>
        this.setState({ weatherData: dataJSON, isLoaded: true })
      )
      .catch((Error) => console.log(Error));
  }
  render() {
    if (this.state.isLoaded) {
      return (
        <View style={styles.container}>
          <ImageBackground source={image} style={styles.image}>
            <Text style={styles.title}>{this.state.weatherData.name}</Text>
            <Text style={styles.paragraph}>
              {this.state.weatherData.main.temp}
            </Text>
            <Text style={styles.paragraph}>
              {this.state.weatherData.weather[0].main} -{' '}
              {this.state.weatherData.weather[0].description}
            </Text>
            <Text style={styles.paragraph}>
              Coordinates - {this.state.weatherData.coord.lon} -{' '}
              {this.state.weatherData.coord.lat}
            </Text>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.paragraph}>INVALID CONNECTION</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,

    padding: 8,
  },
  paragraph: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
