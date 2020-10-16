import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrphanageMaps from './pages/orphanagesMaps';
import OrphanageDetails from './pages/OrphanageDetails';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import Header from './components/header';

const { Navigator,Screen } = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false,cardStyle: { backgroundColor: '#f2f3f5' } }}>
                <Screen name="Home" component={OrphanageMaps} />
                <Screen
                    name="OrphanageDetail"
                    component={OrphanageDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato" />
                    }} />
                <Screen
                    name="OrphanageData"
                    component={OrphanageData} options={{
                        headerShown: true,
                        header: () => <Header title="Orfanato" />
                    }}
                />
                <Screen
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Orfanato" />
                    }}
                />

            </Navigator>
        </NavigationContainer>
    )
};