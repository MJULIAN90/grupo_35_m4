interface CounterStatusProps {
  count: number;
}

function CounterStatus({ count }: CounterStatusProps) {
  let message: string;
  let className: string;
  //   suponiendo que count es = 2

  if (count < 0) {
    message = "Counter is negative";
    className = "status low";
  } else if (count > 0) {
    message = "Counter is positive";
    className = "status high";
  } else {
    message = "Counter is at zero";
    className = "status zero";
  }
  //   suponiendo que count es = 2
  //    if (count > 0) {
  //     message = 'Counter is positive';
  //     className = 'status low';
  //   }
  //   message = 'Counter is positive';
  //   if (count < 0) {
  //     message = 'Counter is negative';
  //     className = 'status high';
  //   } else {
  //     message = 'Counter is at zero';
  //     className = 'status zero';
  //   }

  return <div className={className}>{message}</div>;
}

export default CounterStatus;
