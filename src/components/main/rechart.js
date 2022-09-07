import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  AreaChart, Area,ResponsiveContainer } from 'recharts';


export default function Rechart(props) {
  const xdata=[props.todays, props.yesterdays , props.twodayss, props.threedayss, props.fourdayss]
  console.log("x data ha",xdata)
  const ydata=[props.todayl,props.yesterdayl,props.twodaysl,props.threedaysl,props.fourdaysl]
  console.log("y data ha",ydata);
  const data = [
    {
      name: 'Today',
      sales: props.todays,
      amt: 2400,
    },
    {
      name: "Yesterday",
      sales: props.yesterdays,
      amt: 2210,
    },
    {
      name: '2 Days ago',
      sales: props.twodayss,
      amt: 2290,
    },
    {
      name: '3 Days ago',
      sales: props.threedayss,
      amt: 2000,
    },
    {
      name: '4 days ago',
      sales: props.fourdayss,
      amt: 2181,
    },
  
  ];
  const barColors = ["#7E36AF", "#164666", "#D9534F"]

    return (
      <ResponsiveContainer width="100%" aspect={1.8}>
        <BarChart
          width={500}
          height={200}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" stroke="#8884d8" fill="#8884d8" background={{ stroke: '#eee' }}>
          {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
                        ))
                    }
          </Bar>
      

        </BarChart>
      </ResponsiveContainer>
    );

}

function AreaRechart (props) {
  const data = [
    {
      name: 'Today',
      orders: props.todays,
      amt: 2400,
    },
    {
      name: "Yesterday",
      orders: props.yesterdays,
      amt: 2210,
    },
    {
      name: '2 Days ago',
      orders: props.twodayss,
      amt: 2290,
    },
    {
      name: '3 Days ago',
      orders: props.threedayss,
      amt: 2000,
    },
    {
      name: '4 days ago',
      orders: props.fourdayss,
      amt: 2181,
    },
  
  ];
    return (
      <ResponsiveContainer width="100%" aspect={1.98}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="orders" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    );
  
}
export {AreaRechart};

