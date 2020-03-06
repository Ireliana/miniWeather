import Taro, { useState } from "@tarojs/taro";
import { View, Image, MovableArea, MovableView } from "@tarojs/components";
import "./index.less";

function Menus() {
	const [isExpand, setIsExpand] = useState(false);
	const onMenuClick = function() {
		setIsExpand(!isExpand);
	};

	const menuMap = [
		{
			name: "share",
			img: require("../../img/share_circle.png")
		},
		{
			name: "setting",
			img: require("../../img/setting.png"),
			callback: () => {
				Taro.navigateTo({
					url: "/pages/log/log?id=11&name=xxx"
				});
			}
		},
		{
			name: "location",
			img: require("../../img/location.png")
		},
		{
			name: "info",
			img: require("../../img/info.png")
		},
		{
			name: "main",
			img: require("../../img/menu.png"),
			callback: onMenuClick
		}
	];

	return (
		<MovableArea className="move-area">
			<MovableView
				direction="all"
				className="menu-move"
				x="600rpx"
				y="940rpx"
			>
				<View className={`menus ${isExpand ? "ant" : ""}`}>
					{menuMap.map(menu => (
						<Image
							src={menu.img}
							key={menu.name}
							className={`menu ${menu.name}`}
							onClick={() => {
								menu.callback && menu.callback();
							}}
						></Image>
					))}
				</View>
			</MovableView>
		</MovableArea>
	);
}

export default Menus;
