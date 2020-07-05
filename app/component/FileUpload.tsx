import React, { Component } from 'react';
import {
    ActivityIndicator,
    Button,
    Clipboard,
    Image,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import Utils from '../../data-layer';
export default class PhotoUpload extends Component {
    state = {
        image: null,
        uploading: false,
        server: 'http://localhost:5000/public'
    };

    constructor(props) {
        super(props)
    }

    render() {
        let {
            image
        } = this.state;

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#494949" barStyle="light-content" />
                <Text style={styles.exampleText}>

                </Text>

                <TouchableOpacity onPress={this._takePhoto} style={styles.CamberaStyle} activeOpacity={0.5}>
                    <FontAwesome className={styles.IconsStyle} name="camera-retro" size={65} color="black" />
                </TouchableOpacity>
                {this._maybeRenderImage()}
                {this._maybeRenderUploadingOverlay()}
            </View>
        );
    }

    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
            return (
                <View
                    style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
                    <ActivityIndicator color="#fff" size="large" />
                </View>
            );
        }
    };

    _maybeRenderImage = () => {
        let {
            image
        } = this.state;

        if (!image) {
            return;
        }

        return (
            <View
                style={styles.maybeRenderContainer}>
                <View
                    style={styles.maybeRenderImageContainer}>
                    <Image source={{ uri: image }} style={styles.maybeRenderImage} />
                </View>

                <Text
                    onPress={this._share}
                    onLongPress={this._copyToClipboard}
                    style={styles.maybeRenderImageText}>
                    {image}
                </Text>
            </View>
        );
    };

    _share = () => {
        Share.share({
            message: this.state.image,
            title: 'Check out this photo',
            url: this.state.image,
        });
    };

    _copyToClipboard = () => {
        Clipboard.setString(this.state.image);
        alert('Copied image URL to clipboard');
    };

    _takePhoto = async () => {
        console.log('take photo')
        const {
            status: cameraPerm
        } = await Permissions.askAsync(Permissions.CAMERA);
        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera AND camera roll
        if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            this._handleImagePicked(pickerResult);
        }
    };

    _pickImage = async () => {
        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera roll
        if (cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });

            this._handleImagePicked(pickerResult);
        }
    };

    _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;
        try {
            this.setState({
                uploading: true
            });
            if (!pickerResult.cancelled) {
                uploadResponse = await uploadImageAsync(pickerResult.uri);
                uploadResult = await uploadResponse.json();
                this.setState({
                    image: `${this.state.server}/${uploadResult.filename}`
                });
                Utils.addUserDocs(`${uploadResult.filename}`, this.props.user_id)
                alert("uploaded..");
            }
        } catch (e) {
            console.log({ uploadResponse });
            console.log({ uploadResult });
            console.log(JSON.stringify(e));
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({
                uploading: false
            });
        }
    };
}

async function uploadImageAsync(uri) {
    let photo = { uri: uri }
    let apiUrl = `http://localhost:5000/api/auth/upload`
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    let formData = new FormData();
    formData.append('photo', {
        uri: photo.uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
    });
    let options = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    };
    return fetch(apiUrl, options);
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: '100%'
    },
    IconsStyle: {
        minHeight: 64,
        minWidth: 64
    },
    CamberaStyle: {
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 100,
        borderWidth: 1,
        marginHorizontal: 12,
        marginVertical: 12
    },
    exampleText: {
        fontSize: 20,
        marginBottom: 20,
        marginHorizontal: 15,
        textAlign: 'center',
    },
    maybeRenderUploading: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
    },
    maybeRenderContainer: {
        borderRadius: 3,
        elevation: 2,
        marginTop: 30,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        shadowRadius: 5,
        width: 250,
    },
    maybeRenderImageContainer: {
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        overflow: 'hidden',
    },
    maybeRenderImage: {
        height: 250,
        width: 250,
    },
    maybeRenderImageText: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    }
});