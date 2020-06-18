import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const chartConfig = {
    backgroundGradientFrom: "#f5f3eb",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#f5f3eb",
    backgroundGradientToOpacity: 0.5,
    backgroundColor: "#fff",
    color: (opacity = 1) => `rgba(89,128,24, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(49,56,51, ${opacity})`,
    fillShadowGradient: 'rgb(49,56,51)',
    fillShadowGradientOpacity: 0.05,
};
export default class ChartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointContent: '', xCoordinate: 0, yCoordinate: 0, labelNumber: 5,
            chartData: {
                labels: ["مهر", "اسفند", "فروردین", "اردیبهشت", "خرداد"],
                datasets: [
                    {
                        data: [20, 45, 28, 80, 99],
                    }
                ]
            }

        }
    }

    renderLabel() {
        return <View style={styles.persianLableContainer}>
            {this.state.chartData.labels.length > 0 && this.state.chartData.labels.map((item, i) => {
                return <Text key={i} style={[styles.persianLable, { flex: this.state.labelNumber !== 1 ? 1 / this.state.labelNumber : 1 }]}>{item}</Text>
            })
            }
        </View>
    }

    getPointContent(value) {
        this.setState({
            pointContent: value.value,
            xCoordinate: value.x,
            yCoordinate: value.y
        })
    }

    render() {
        return <View style={styles.container}>
            <Text style={styles.lable}>Line chart with Persian lables</Text>
            <View >
                <LineChart
                    data={this.state.chartData}
                    width={SCREEN_WIDTH}
                    height={SCREEN_HEIGHT / 2.5}
                    yAxisInterval={10}
                    chartConfig={chartConfig}
                    segments={5}
                    onDataPointClick={(value) => this.getPointContent(value)}
                    withVerticalLabels={false}
                    withShadow={true}
                    fromZero={true}
                    withOuterLines={false}
                    bezier
                >
                </LineChart>
                {this.renderLabel()}
            </View>
            {this.state.pointContent !== '' &&
                <View style={[styles.pointContentContainer, {
                    top: this.state.yCoordinate + wp('15%'),
                    left: this.state.xCoordinate,
                }]}>
                    <Text style={styles.pointContentText}>{this.state.pointContent}</Text>
                </View>}

        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        paddingRight: 5,
        paddingLeft: 5,
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: wp('10%'),
        marginTop: wp('5%'),
    },
    lable: {
        marginBottom: wp('10%')
    },
    pointContentContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#598018',
        borderRadius: 20,
        padding: 10,
    },
    pointContentText: {
        color: '#ffffff',
        fontSize: wp('2%')
    },
    persianLableContainer: {
        flexDirection: 'row',
        paddingLeft: wp('15%'),
        position: 'absolute',
        bottom: 30
    },
    persianLable: {
        marginRight: 3,
        marginLeft: 3,
        fontSize: wp('2%'),
        textAlign: 'left',
    }

})
