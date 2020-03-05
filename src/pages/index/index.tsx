import { ComponentType } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, OpenData, Text } from "@tarojs/components";
// import { observer, inject } from "@tarojs/mobx";
import "./index.less";
import iconArrow from "../../img/icon-down.png";
import { formatDate } from "../../utils/index";

type topicItem = {
	img: string;
	barColor: string;
};

type IndexState = {
	topicList: Array<topicItem>;
	topicIndex: number;

	detailsMap: {
		key: Array<string>;
		val: {
			[key: string]: string;
		};
	};
	weather: {
		basic: {
			parent_city: string;
			location: string;
			[key: string]: string;
		};
		now: {
			tmp: string;
			cond_txt: string;
			[key: string]: string;
		};
		update: {
			loc: string;
		};
	};
};

class Index extends Component {
	/**
	 * 页面配置
	 * 指定config的类型声明为: Taro.Config
	 *
	 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
	 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
	 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
	 */
	config: Config = {
		navigationBarTitleText: "本地天气",
		enablePullDownRefresh: true
	};

	state: IndexState = {
		topicList: [
			{
				img: require("../../img/beach-bird-birds-235787.jpg"),
				barColor: "#393836"
			},
			{
				img: require("../../img/clouds-forest-idyllic-417102.jpg"),
				barColor: "#0085e5"
			},
			{
				img: require("../../img/backlit-dawn-dusk-327466.jpg"),
				barColor: "#2d2225"
			},
			{
				img: require("../../img/accomplishment-adventure-clear-sky-585825.jpg"),
				barColor: "#004a89"
			},
			{
				img: require("../../img/asphalt-blue-sky-clouds-490411.jpg"),
				barColor: "#009ffe"
			},
			{
				img: require("../../img/aerial-climate-cold-296559.jpg"),
				barColor: "#d6d1e6"
			},
			{
				img: require("../../img/beautiful-cold-dawn-547115.jpg"),
				barColor: "#ffa5bc"
			}
		],
		detailsMap: {
			key: [
				"tmp",
				"fl",
				"hum",
				"pcpn",
				"wind_dir",
				"wind_deg",
				"wind_sc",
				"wind_spd",
				"vis",
				"pres",
				"cloud",
				""
			],
			val: {
				tmp: "温度(℃)",
				fl: "体感温度(℃)",
				hum: "相对湿度(%)",
				pcpn: "降水量(mm)",
				wind_dir: "风向",
				wind_deg: "风向角度(deg)",
				wind_sc: "风力(级)",
				wind_spd: "风速(mk/h)",
				vis: "能见度(km)",
				pres: "气压(mb)",
				cloud: "云量"
			}
		},
		topicIndex: 2,
		weather: {
			basic: { location: "", parent_city: "" },
			now: { tmp: "", cond_txt: "" },
			update: { loc: "" }
		}
	};
	componentWillMount() {}

	componentWillReact() {}

	async componentDidMount() {
		const { authSetting } = await this.getSetting();
		if (!authSetting["scope.userLocation"]) {
			await Taro.authorize({
				scope: "scope.userLocation"
			});
		}
		this.getWeather();
	}

	// 获取天气数据
	async getWeather() {
		const { latitude, longitude } = await Taro.getLocation({
			type: "wgs84",
			success: res => res
		});
		Taro.request({
			url: "https://free-api.heweather.net/s6/weather/now",
			data: {
				location: `${latitude},${longitude}`,
				key: "1b3706fe0a3e40f895c706637591a074"
			},
			success: res => {
				this.setState(prevState => {
					return {
						...prevState,
						weather: {
							...res.data.HeWeather6[0]
						}
					};
				});
			}
		});
	}

	// 获取用户设置
	getSetting() {
		return Taro.getSetting({
			success: function(res) {
				return res.authSetting;
			}
		});
	}

	// // 获取用户信息
	// getUserInfo() {
	// 	Taro.getUserInfo({
	// 		success: res => {
	// 			const { nickName, avatarUrl, province, city } = res.userInfo;
	// 			console.log(nickName, avatarUrl, province, city);
	// 		}
	// 	});
	// }

	// 设置主题背景
	setTopic(color) {
		Taro.setNavigationBarColor({
			frontColor: "#000000",
			backgroundColor: color || this.state.topicList[0].barColor
		});
	}

	onPullDownRefresh() {
		this.getWeather();
	}

	get topicImg() {
		return this.state.topicList[this.state.topicIndex].img;
	}

	get cityName() {
		return this.state.weather.basic
			? `${this.state.weather.basic.parent_city} ${this.state.weather.basic.location}`
			: "定位中";
	}

	get updateTime() {
		if (this.state.weather.update.loc) {
			return formatDate(this.state.weather.update.loc) + " 更新";
		}
	}

	get temp() {
		return this.state.weather.now.tmp || "";
	}

	get cond_txt() {
		return this.state.weather.now.cond_txt || "";
	}
	render() {
		return (
			<View className="index">
				<Image
					className="topicImg"
					mode="aspectFill"
					src={this.topicImg}
				/>
				<View className="content">
					<View className="userInfo">
						<OpenData
							className="avatar"
							type="userAvatarUrl"
						></OpenData>
						<OpenData
							className="username"
							type="userNickName"
						></OpenData>
						<Image
							className="icon-arrow"
							mode="aspectFill"
							src={iconArrow}
						/>
					</View>
					<View className="infoView">
						<View className="city-container">
							<View className="city">
								<View className="icon-location"></View>
								<Text className="name">{this.cityName}</Text>
								<Image
									className="icon-arrow"
									mode="aspectFill"
									src={iconArrow}
								/>
							</View>
							<Text className="updateTime">
								{this.updateTime}
							</Text>
						</View>
						<View className="tmp">
							{this.temp}
							<Text className="degree">℃</Text>
						</View>
						<View className="cond_txt">{this.cond_txt}</View>
					</View>
					<View className="details">
						{this.state.detailsMap.key.map((detail, index) => (
							<View key={index} className="detail">
								<View>{this.state.detailsMap.val[detail]}</View>
								<View>{this.state.weather.now[detail]}</View>
							</View>
						))}
					</View>
				</View>
			</View>
		);
	}
}

export default Index as ComponentType;
