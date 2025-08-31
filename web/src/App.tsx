import { EnumTypeText, Text } from "./components/text"
import LCMIntervalCard from "./lcm_interval/components/lcm_interval_card"

function App() {

  return (
    <div className="container">
      <Text type={EnumTypeText.heading}>Cálculo do MMC</Text>

      <LCMIntervalCard></LCMIntervalCard>
    </div>
  )
}

export default App