import { createNavigator, TabRouter } from 'react-navigation'
import Profile from './Profile/Profile'
import Shipments from './Shipments/Shipments'
import History from './History/History'
const AppTabRouter = TabRouter({
    Profile: { screen: Profile },
    Shipments: { screen: Shipments },
    History: { screen: History }
}, {})

export default AppTabRouter