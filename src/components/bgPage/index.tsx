import Taro, { useState } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./index.less";
type topicItem = {
	img: string;
	barColor: string;
};
type BgPageProps = {
	bgList: topicItem[];
	topicIndex: number;
	setTopic: (key: number) => void;
	onClose: () => void;
};

function BgPage(props: BgPageProps) {
	const { topicIndex, setTopic, onClose } = props;
	return (
		<View className="bgPage">
			<View>更换背景</View>
			<View className="bg-list">
				{props.bgList.map((bg, index) => (
					<View
						className={`bg-box ${
							topicIndex === index ? "atv" : ""
						}`}
						key={index}
						onClick={() => {
							setTopic(index);
						}}
					>
						<Image className="bg-img" src={bg.img}></Image>
					</View>
				))}
			</View>
			<View
				className="close-area"
				onClick={() => {
					Taro.showToast({
						title: "主题设置成功",
						icon: "success",
						duration: 2000
                    });
                    onClose();
				}}
			>
				<View className="up-arrow"></View>
			</View>
		</View>
	);
}
BgPage.defaultProps = {
	bgList: []
};
export default BgPage;
