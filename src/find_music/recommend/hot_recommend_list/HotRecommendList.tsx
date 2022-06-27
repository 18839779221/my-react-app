import { Fragment, useEffect, useState } from "react";
import { HotRecommendModel, HotRecommendResModel } from "../../../model/model";
import { formatCountToChinese } from "../../../utils/format";
import request from "../../../utils/request";
import "./HotRecommendList.css";

export function HotRecommendList(props: { maxItemCount: number }) {
  const [recommendList, setRecommendList] = useState<HotRecommendModel[]>([]);

  useEffect(() => {
    request({
      url: "/personalized",
    }).then((res: HotRecommendResModel) => {
      setRecommendList(res.result.slice(0, props.maxItemCount));
    });
  }, []);

  return (
    <div className="recommend-list">
      {recommendList.map((item, index) => (
        <div className="recommend-list-item" key={index}>
          <div
            className="recommend-list-item-img"
            title={item.name}
            style={{
              background: `url(${item.picUrl}) center center / cover no-repeat`,
            }}
          >
            <div className="recommend-list-item-play">
                <div>{formatCountToChinese(item.playCount, 2)}</div>
                <a></a>
            </div>
          </div>
          <a className="recommend-list-item-title">{item.name}</a>
        </div>
      ))}
    </div>
  );
}
