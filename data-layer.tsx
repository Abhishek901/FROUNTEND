import { AsyncStorage } from "react-native";

class Utils {
    private _baseUrl;
    public _imageUrl;
    constructor(baseUrl) {
        this._baseUrl = baseUrl
        this._imageUrl = `${baseUrl}/public`
    }
    public getUserData = async () => {
        try {
            const header = await this.getTokenInHeaders()
            const headers = JSON.parse(JSON.stringify(header))
            const requestOptions = {
                headers: headers,
                method: 'GET'
            }
            return new Promise((resolve, reject) => {
                fetch(`${this._baseUrl}/api/user`, requestOptions).then((data) => { resolve(data) }).catch((err) => { reject(err) })
            });

        } catch (error) {
            console.log('here in error')
            console.log(error)
        }

    }

    public getCurrentUserData = async () => {
        const header = await this.getTokenInHeaders()
        const headers = JSON.parse(JSON.stringify(header))
        const requestOptions = {
            headers: headers,
            method: 'GET'
        }
        return fetch(`${this._baseUrl}/api/user/me`, requestOptions)
    }

    public getTokenInHeaders = async () => {
        const tokens = await this.getTokens();
        if (tokens) {
            const access = tokens[0];
            const reffresh = tokens[1];
            const bearer = `Bearer ${access} ${reffresh}`
            const headers = {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
            return headers;
        } else {
            return false;
        }
    }

    public getTokens = async () => {
        const getAccessToken = await AsyncStorage.getItem("token");
        const getReffreshToken = await AsyncStorage.getItem("reffreshToken");
        if (Boolean(getReffreshToken) && Boolean(getAccessToken)) {
            const tokens = [getAccessToken, getReffreshToken];
            return tokens;
        } else {
            return false;
        }
    }
    public addUserImage = async (name) => {
        const header = await this.getTokenInHeaders()
        const headers = JSON.parse(JSON.stringify(header))
        const requestOptions = {
            headers: headers,
            method: 'PUT',
            body: JSON.stringify({ doc: { profilePic: name } })
        }
        try {
            const UserData = await fetch(`${this._baseUrl}/api/user/update`, requestOptions)
        } catch (err) {
            return err
        }
    }
    public addUserDocs = async (name) => {
        const userMore = this.getCurrentUserData();
        userMore.then(data => {
            data.json().then(async (data) => {
                data.message[0].docs.push(name);
                const newDocsArray = data.message[0].docs;
                const header = await this.getTokenInHeaders()
                const headers = JSON.parse(JSON.stringify(header))
                const requestOptions = {
                    headers: headers,
                    method: 'PUT',
                    body: JSON.stringify({ doc: { docs: newDocsArray } })
                }
                try {
                    const UserData = await fetch(`${this._baseUrl}/api/user/update`, requestOptions)
                } catch (err) {
                    return err
                }
            })
        })
    }

    public loadShipments = async () => {
        try {
            const header = await this.getTokenInHeaders()
            const headers = JSON.parse(JSON.stringify(header))
            const requestOptions = {
                headers: headers,
                method: 'GET'
            }
            return fetch(`${this._baseUrl}/api/shipment/per_rider`, requestOptions)
        } catch (error) {
            console.log('here in error')
            console.log(error)
        }
    }

    public updateShipmentStatus = async (id, status) => {
        const header = await this.getTokenInHeaders()
        const headers = JSON.parse(JSON.stringify(header))
        const requestOptions = {
            headers: headers,
            method: 'PUT',
            body: JSON.stringify({ _id: id, doc: { status: status } })
        }
        try {
            console.log(requestOptions)
            const UserData = await fetch(`${this._baseUrl}/api/shipment/update`, requestOptions)
            return UserData;
        } catch (err) {
            return err
        }
    }
}


const UtilsObject = new Utils("http://localhost:5000");
export default UtilsObject;