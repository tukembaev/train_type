import { FC, memo } from 'react'

import {
    AreaChart,
    CartesianGrid,
    Legend,
    Area,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { getGraphData } from 'entities/Session/model/slices/sessionSlice'

import { useAppSelector } from 'app/providers/StoreProvider'

interface GraphProps {
    width?: number
    height?: number
}

const SessionGraph: FC<GraphProps> = ({ width, height }) => {
    const sessionData = useAppSelector(getGraphData)

    return (
        <div style={{ display: 'flex' }}>
            <AreaChart
                width={width || 1000}
                height={height || 300}
                data={sessionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                    label={{
                        value: 'Words per minute',
                        position: 'insideLeft',
                        angle: -90,
                        textAnchor: 'end',
                        dy: 80,
                        dx: 0,
                    }}
                />
                <Tooltip />
                {width ? null : <Legend />}

                <Area
                    type="monotone"
                    dataKey="raw"
                    stroke="var(--secondary-color)"
                    fill="var(--third-color)"
                    activeDot={{ r: 3 }}
                    strokeWidth={3}
                />
                <Area
                    type="monotone"
                    dataKey="wpm"
                    stroke="var(--primary-color)"
                    activeDot={{ r: 3 }}
                    strokeWidth={3}
                    fill="var(--secondary-color)"
                />
            </AreaChart>
        </div>
    )
}

export default memo(SessionGraph)
