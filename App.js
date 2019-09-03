// import React, {Component} from 'react';
// import {WebView} from 'react-native-webview';

// class App extends Component {
//   render() {
//     return (
//       <WebView
//         source={{uri: 'https://www.daycareglobal.com'}}
//         style={{marginTop: 20}}
//       />
//     );
//   }
// }
// export default App;



// import RNWebviewWithRefresh from "react-native-webview-with-refresh";
// import React, {Component} from 'react'
// class App extends Component
//  {
//   onUrlChange = event => {
//     alert(event.url);
//     alert(event.condition);
//   };
 
//   onStartLoad = event => {
//     console.warn("onStartLoad: %s", event.url);
//   };
 
//   onFinishLoad = event => {
//     console.warn("onFinishLoad: %s", event.url);
//   };
 
//   render() {
//     return (
//       <View style={styles.container}>
//         <WebViewWithRefresh
//           url='https://www.daycareglobal.com'
//           matchCondition="(http|https)://starfans.info"
//           onUrlMatch={this.onUrlChange}
//           onStartLoad={this.onStartLoad}
//           onFinishLoad={this.onFinishLoad}
//           style={styles.webview}
//           ref="webview"
//         />
//       </View>
//     );
//   }
// }
//  export default App;




import React, {Component} from 'react';
import {PermissionsAndroid, Alert} from 'react-native';
import { WebView } from "react-native-webview";


export default class App extends Component {
  async  requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

async requestLocationPermission() {
    try {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
        'title': 'Location Access Permission',
        'message': 'We would like to use your location ' +
                    'so you we track you.'
        }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
        await navigator.geolocation.getCurrentPosition(
          (position) => {
            Alert.alert('latitiude:  ',position.coords.latitude.toFixed(2));
          },
          (error) => console.log(error),
          {enableHighAccuracy: false, timeout: 50000}
      );
    }
  else {
        console.log("Location permission denied")
    }
    } catch (err) {
    console.warn(err)
    }
}
async requestStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'storage Permission',
        message:
          ' App needs access to your storage ' +
          '.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Granted');
    } else {
      console.log('denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

async requestStorageWritePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'WRITE storage Permission',
        message:
          ' App needs access to your storage ' +
          '.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Granted');
    } else {
      console.log('denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

componentDidMount() {
        this.requestLocationPermission();
        this.requestCameraPermission();
        this.requestStoragePermission()
        this.requestStorageWritePermission();
    }

render() {
    return (
    <WebView
        source={{uri: 'https://www.daycareglobal.com'}}
        style={{marginTop: 20}}
        geolocationEnabled={true}
        onMessage={(event)=> console.log(event.nativeEvent.data)}
        scalesPageToFit={true}
        javaScriptEnabled = {true}
    />
    );
}
}