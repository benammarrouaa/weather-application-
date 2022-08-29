import React from "react";
import styled from "styled-components";
import moment from "moment";
export const WeatherIcons = {
  "01d": "/../icons/sunny.svg",
  "01n": "/../icons/night.svg",
  "02d": "/../icons/day.svg",
  "02n": "/../icons/cloudy-night.svg",
  "03d": "/../icons/cloudy.svg",
  "03n": "/../icons/cloudy.svg",
  "04d": "/../icons/perfect-day.svg",
  "04n": "/../icons/cloudy-night.svg",
  "09d": "/../icons/rain.svg",
  "09n": "/../icons/rain-night.svg",
  "10d": "/../icons/rain.svg",
  "10n": "/../icons/rain-night.svg",
  "11d": "/../icons/storm.svg",
  "11n": "/../icons/storm.svg",
};
export const WeatherInfoIcons = {
  sunset: "/../icons/temp.svg",
  sunrise: "/../icons/temp.svg",
  humidity: "/../icons/humidity.svg",
  wind: "/../icons/wind.svg",
  pressure: "/../icons/pressure.svg",
};
const Card = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 10px auto;
  padding: 20px 5px;
  border-radius: 20px;
  overflow: hidden;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  background: white;
`;
const Location = styled.span`
  margin: 15px auto;
  text-transform: capitalize;
  font-size: 28px;
  font-weight: bold;
`;
const Condition = styled.span`
  text-align: center;
  text-transform: capitalize;
  font-size: 14px;
  & span {
    font-size: 28px;
  }
`;
const WeatherInfoLabel = styled.span`
  margin: 20px 25px 10px;
  text-transform: capitalize;
  text-align: start;
  width: 100%;
  font-weight: bold;
  font-size: 14px;
`;
const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px auto;
`;
const WeatherContainer = styled.div`
  overflow: hidden;
  padding: 0 0 32px;
  margin: 70px auto 0;
  width: 400px;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  flex-wrap: wrap;
  background: #f7f1e6;
`;
const WeatherInfoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;
const InfoContainer = styled.div`
  display: flex;
  margin: 5px 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const InfoIcon = styled.img`
  width: 36px;
  height: 36px;
`;
const InfoLabel = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin: 15px;
  & span {
    font-size: 12px;
    text-transform: capitalize;
  }
`;

const WeatherInfoComponent = (props) => {
  const { name, value } = props;
  return (
    <InfoContainer>
      <InfoIcon src={WeatherInfoIcons[name]} />
      <InfoLabel>
        {value}
        <span>{name}</span>
        <div></div>
      </InfoLabel>
    </InfoContainer>
  );
};
const WeatherComponent = ({ WeatherData }) => {
  const isDay = WeatherData?.weather[0].icon?.includes("d");
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };
  return (
    <Card>
      <WeatherContainer>
        <Location>{`${WeatherData?.name}, ${WeatherData?.sys?.country}`}</Location>
        <p>
          {moment().format("dddd")},{moment().format("LL")}
        </p>
        <Condition>
          <span>{`${Math.floor(WeatherData?.main?.temp)}°C`}</span>
          {`  |  ${WeatherData?.weather[0].description}`}
        </Condition>
        <WeatherIcon src={WeatherIcons[WeatherData?.weather[0].icon]} />
      </WeatherContainer>
      <WeatherInfoLabel>Weather Details</WeatherInfoLabel>
      <WeatherInfoContainer>
        <WeatherInfoComponent
          name={isDay ? "sunset" : "sunrise"}
          value={`${getTime(WeatherData?.sys[isDay ? "sunset" : "sunrise"])}`}
        />
        <WeatherInfoComponent
          name={"humidity"}
          value={WeatherData?.main?.humidity}
        />
        <WeatherInfoComponent name={"wind"} value={WeatherData?.wind?.speed} />
        <WeatherInfoComponent
          name={"pressure"}
          value={WeatherData?.main?.pressure}
        />
      </WeatherInfoContainer>
    </Card>
  );
};

export default WeatherComponent;
