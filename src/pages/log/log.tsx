import { ComponentType } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, OpenData, Text } from "@tarojs/components";
import "./log.less";


class Log extends Component {
	/**
	 * 页面配置
	 * 指定config的类型声明为: Taro.Config
	 *
	 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
	 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
	 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
	 */
	config: Config = {
		navigationBarTitleText: "log 页面"
	};


	componentWillMount() {}

	componentWillReact() {}

    async componentDidMount() {
        console.log(this.$router.params)
    }

	render() {
		return <View className="logPage">my log pages</View>;
	}
}

export default Log as ComponentType;
