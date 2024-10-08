import React from "react";
import "./PublicCard.css";
import { likeGroup } from "../api";
import { ReactComponent as LikeIcon } from "../assets/icon=flower.svg";
import { useNavigate } from "react-router-dom";

const PublicCard = ({ group, showBadges = true, showImage = true }) => {
  const navigate = useNavigate();

  const handleLike = async (event) => {
    event.stopPropagation();
    try {
      await likeGroup(group.id);
      alert("공감했습니다!");
    } catch (error) {
      console.error("Failed to like group:", error);
    }
  };
  // 숫자를 K 단위로 변환하는 함수
  const formatLikeCount = (likeCount) => {
    if (likeCount >= 1000) {
      return (likeCount / 1000).toFixed(1) + "K"; // 1000 이상일 때 K로 변환
    }
    return likeCount; // 1000 미만일 때는 그대로 숫자 표시
  };

  const handleCardClick = () => {
    if (group.isPublic) {
      navigate(`/groups/${group.id}`); // 공개 그룹은 바로 상세 페이지로 이동
    } else {
      navigate(`/groups/private/access/${group.id}`); // 비공개 그룹은 비밀번호 입력 페이지로 이동
    }
  };

  return (
    <div className="card-container" onClick={handleCardClick}>
      {showImage && group.imageUrl && (
        <div className="card-image-container">
          <img
            src={group.imageUrl}
            alt={group.name}
            width="100%"
            height="auto"
          />
        </div>
      )}
      <div className="card-content">
        <div className="card-info">
          <span>
            D+
            {Math.floor(
              (new Date() - new Date(group.createdAt)) / (1000 * 60 * 60 * 24)
            )}
          </span>

          <span>| {group.isPublic ? "공개" : "비공개"}</span>
        </div>
        <h2 className="card-title">{group.name}</h2>
        <p className="card-description">{group.introduction}</p>
        <div className="card-footer">
          {showBadges && (
            <div className="footer-item">
              <span>획득 배지</span>
              <span>{group.badgeCount}</span>
            </div>
          )}
          <div className="footer-item">
            <span>추억</span>
            <span>{group.postCount}</span>
          </div>
          <div className="footer-item">
            <span>그룹 공감</span>
            <div className="like-container" onClick={handleLike}>
              <LikeIcon width="16px" height="16px" />
              <span>{formatLikeCount(group.likeCount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicCard;
