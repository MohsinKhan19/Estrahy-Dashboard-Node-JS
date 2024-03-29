import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';
import StatsCards from '../../components/Dashboard/StatsCards';
import BriefInsights from '../../components/Dashboard/BriefInsights';
import NewReservations from '../../components/Dashboard/NewReservations';
import NewApprovals from '../../components/Dashboard/NewApprovals';
import Sales from '../../components/Dashboard/Sales';
import Disputes from '../../components/Dashboard/Disputes';
import getHeader from '../../utilis/getHeader';
import API from '../../utilis/API';
import Loader from '../../components/Loader';

const index = () => {
    const [selectedcardId, setSelectedcardId] = useState(1);
    const [loading, setloading] = useState(false);
    const [insightsData, setinsightsData] = useState([]);
    const [newReservationsData, setnewReservationsData] = useState();
    const [insightsGraphdata, setInsightsGraphdata] = useState();
    const [approvalsData, setapprovalsData] = useState();
    const [salesData, setSalesData] = useState();
    const [disputesData, setdisputesData] = useState();

    const loadInsightsData = async () => {
        setloading(true)
        try {
            const header = getHeader()
            const { data } = await API.get('Dashboard/insights', header)

            setinsightsData(data)
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }

    const loadInsightsGraphdata = async () => {
        try {
            const header = getHeader()
            const { data } = await API.get('Dashboard/insights/week_graph', header)
            console.log('data', data?.body)
            setInsightsGraphdata(data?.body)
        } catch (error) {
            console.log(error)
        }
    }

    const loadNewreservationsData = async () => {
        setloading(true)
        try {
            const header = getHeader()
            const { data } = await API.get('Dashboard/reservations/all', header)
            setnewReservationsData(data?.body)
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }

    const loadVillasApprovalList = async () => {
        try {
            const header = getHeader()
            const { data } = await API.get('Dashboard/all/villaapprovals', header)
            setapprovalsData(data?.body)
        } catch (error) {
            console.log(error)
        }
    }

    const loadSalesData = async () => {
        try {
            const header = getHeader()
            const { data } = await API.get('Dashboard/sales/week_graph', header)
            setSalesData(data)
        } catch (error) {
            console.log(error)
        }

    }

    const loadDisputesData = async () => {
        try {
            const header = getHeader()
            const { data } = await API.get(`Dashboard/disputes/all?page=${1}`, header);

            setdisputesData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadInsightsData()
        loadInsightsGraphdata()
        loadNewreservationsData()
        loadVillasApprovalList()
        loadSalesData()
        loadDisputesData()
    }, []);

    return (
        <>
            <Head>
                <title>Esterahy - Dashboard</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout title="Dashboard" slug="Explore all villa reservations here">
                <StatsCards
                    callBack={(id) => setSelectedcardId(id)}
                    value={selectedcardId}
                />
                {selectedcardId == 1 && <BriefInsights
                    data={insightsData}
                    graphData={insightsGraphdata}
                />}
                {selectedcardId == 2 && <NewReservations data={newReservationsData} />}
                {selectedcardId == 3 && <NewApprovals data={approvalsData} />}
                {selectedcardId == 4 && <Sales data={salesData} />}
                {selectedcardId == 5 && <Disputes data={disputesData} />}
                {loading && <Loader />}
            </Layout>
        </>
    )
}

export default index