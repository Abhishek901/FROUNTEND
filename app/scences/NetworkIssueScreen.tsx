import react from 'react';
import { View ,Text,StyleSheet} from 'react-native';

const NetworkIssueScreen = () =>{
    return(
        <View style={styles.container}>
            <Text style={styles.errorText}>Please check your Network connectivity or try later!!!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#819ca9',
        flexGrow: 1,
        paddingRight: 56,
        paddingLeft: 56,
      },
      errorText:{
        flexGrow:1
      }

})

export default NetworkIssueScreen;