'use client';
import styles from "./page.module.css";
import React, { useState, useEffect } from 'react';
import { Table, DatePicker } from 'antd';

export default function Matches() {
  let [competitions, setCompetitions] = useState([]);
  
  const getData = async () => {
    const res = await fetch ('http://localhost:8080/v4/competitions/?areas=2077&plan=TIER_ONE', {
      headers: {
        'X-Auth-Token' : 'b03baf1be24a4c728b2ee02ce3a38fa8' 
      }
    });
    return await res.json();
  }

  useEffect(() => {
    getData().then((data) => {
      setCompetitions(data);
    });
  }, []);

  function onChangeDate(date){
    let fromFlag;
      let filtered = competitions.competitions.filter(match => {
      fromFlag = true;
      if (date) fromFlag = Date.parse(date) <= Date.parse(match.currentSeason.startDate);
      return fromFlag;
    })
    competitions.competitions = [...filtered];
    setCompetitions(competitions);
  }

  const columns = [
    {
      title: 'Название лиги',
      dataIndex: 'name',
      key: 'id',
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => {
        if (a.name < b.name)
          return -1;
        if ( a.name > b.name)
          return 1;
        return 0;
      }
    },
    {
      title: 'Страна',
      dataIndex: ['area', 'name'],
      key: ['area', 'id']
    },
    {
      title: 'Дата начала',
      dataIndex: ['currentSeason', 'startDate'],
      key: ['currentSeason', 'id']
    },
    {
      title: 'Дата окончания',
      dataIndex: ['currentSeason', 'endDate'],
      key: ['currentSeason', 'id']
    }
  ]
  return (
    <main className={styles.main}>
        <h1>Страница матчей</h1>
        <DatePicker onChange={onChangeDate}></DatePicker>
        <Table dataSource={competitions.competitions} columns={columns}></Table>
      </main>
  );
}
