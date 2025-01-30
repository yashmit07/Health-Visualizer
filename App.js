import * as React from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Image,
  Platform,
  FlatList,
  ScrollView,
  ImageBackground,
  TextInput,
} from 'react-native';
import DATA from './Data';
import { Picker } from '@react-native-picker/picker';

export default class Page1 extends React.Component {
  constructor(props) {
    super(props);
    ['california', 'washington'];
    this.state = {
      searchTerm: '',
    };
  }
  setSearchTerm = (text) => {
    this.setState({ searchTerm: text });
  };
  render() {
    console.log(this.state.searchTerm);
    let searchResults = [];
//tolowercase allows user to use lowercase and still be able to search up states when using the search bar (user friendly :))
    DATA.forEach((element) => {
      if (
        element['state']
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase())
      ) {
        searchResults.push(element);
      }
    });

    console.log(searchResults);
    return (
      <ScrollView style={styles.container}>
        <ImageBackground
          source={require('./assets/images/covid.jpg')}
          style={styles.image}>
          <Text style={[styles.titleText]}>COVID-19 STATS</Text>
          <Text style={styles.subText}>
            Deaths, Infections and Tests by State
          </Text>
        </ImageBackground>
        <TextInput
          style={styles.textBox}
          onChangeText={(text) => this.setSearchTerm(text)}
          placeholder={'Search for a state'}
          value={this.state.code}
        />
        <FlatList
          data={searchResults}
          renderItem={this.showStateData}
          keyExtractor={(item) => item['state']}
        />
      </ScrollView>
    );
  }

  showStateData = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitleText}>{item['state']}</Text>
        <Text style={(styles.cardInfoText, { color: 'blue' })}>
          People Tested: {item['Tested']}
        </Text>
        <Text style={(styles.cardInfoText, { color: 'red' })}>
         Deaths: {item['deaths']}
        </Text>
        <Text style={(styles.cardInfoText, { color: 'green' })}>
          Number of Hospitals: {item['Hospitals']}
        </Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    borderWidth: 3,
    borderRadius: 12,
    borderColor: 'black',
    padding: 13,
  },
  cardTitleText: {
    fontSize: 20,
    fontWeight: 700,
  },
  cardInfoText: {
    marginTop:5,
    fontSize: 16,
    fontWeight: 500,
  },
  container: {
    backgroundColor: '#3d80cc',
    FlexDirection: 'center',
  },
  textBox: {
    backgroundColor: 'white',
    height: 50,
    borderColor: '#8ff6ff',
    borderWidth: 4,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
  },
  titleText: {
    fontSize: 40,
    padding: 3,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  subText: {
    fontSize: 16,
    padding: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },

  image: {
    flex: 0.7,
    paddingTop: 30,
    paddingBottom: 20,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
