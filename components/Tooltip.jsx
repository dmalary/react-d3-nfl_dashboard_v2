/* eslint-disable react/prop-types */

const Tooltip = ({ info }) => {
  if (!info) return null;

  console.log('info', info)
  return (
    <div
      style={{
        position: 'absolute',
        left: `${info.x}px`,
        top: `${info.y}px`,
        // left: `${info.lng}px`,
        // top: `${info.lat}px`,
        transform: 'translate(-50%, -130%)',
        backgroundColor: '#f6f6f6',
        color: '#013369',
        padding: '5px',
        borderRadius: '4px',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <strong>College:</strong> {info.college}
    </div>
  );
};

export default Tooltip;
