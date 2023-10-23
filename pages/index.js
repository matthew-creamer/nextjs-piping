import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Card } from '../components/card';
import React, { useState } from 'react';
import Link from 'next/link';
import useSWR, { mutate } from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [cardData, setCardData] = useState({ visible: false, row: null });
  const { data, error } = useSWR('/api/info', fetcher);


  const showPopup = (line_number) => {
    if (line_number !== null) {
      const selectedRow = data.find((row) => row.line_number === line_number);
      setCardData({ visible: true, row: selectedRow });
    } else {
      setCardData({
        visible: true,
        row: {
          line_number: "",
          location: "",
          from: "",
          to: "",
          drawing_number: "",
          service: "",
          material: "",
          inservice_date: "",
          pipe_size: 0,
          original_thickness: 0,
          stress: 0,
          joint_efficiency: 0,
          ca: 0,
          design_life: 0,
          design_pressure: 0,
          operating_pressure: 0,
          design_temperature: 0,
          operating_temperature: 0
        }
      });
    }
  };

  const hidePopup = () => {
    setCardData({ visible: false, row: null });
  };

  const handleInputChange = (event, fieldName) => {
    setCardData({ ...cardData, row: { ...cardData.row, [fieldName]: event.target.value } });
  };

  async function onSubmit(event) {
    event.preventDefault();

    const response = await fetch('/api/info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardData.row),
    });

    if (response.status === 200 || response.status === 201)
      mutate('/api/info');
  }

  const handleDelete = async (event, line_number) => {
    event.preventDefault();
    const response = await fetch(`/api/info`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: cardData.row.id }),
    });

    if (response.status === 204) {
      mutate('/api/info');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Piping</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        cardData.visible &&
        <Card title="PIPING INFORMATION" closePopup={hidePopup}>
          <form onSubmit={onSubmit}>
            <div className={styles.popup}>
              <div className={styles.inputContainer}>
                <label>Line Number</label>
                <input
                  name='line_number'
                  type='text'
                  value={cardData.row.line_number}
                  onChange={(event) => handleInputChange(event, 'line_number')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Location</label>
                <input
                  name='location'
                  type='text'
                  value={cardData.row !== null ? cardData.row.location : null}
                  onChange={(event) => handleInputChange(event, 'location')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>From</label>
                <input
                  name='from'
                  type='text'
                  value={cardData.row !== null ? cardData.row.from : null}
                  onChange={(event) => handleInputChange(event, 'from')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>To</label>
                <input
                  name='to'
                  type='text'
                  value={cardData.row !== null ? cardData.row.to : null}
                  onChange={(event) => handleInputChange(event, 'to')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Drawing Number</label>
                <input
                  name='drawing_number'
                  type='text'
                  value={cardData.row !== null ? cardData.row.drawing_number : null}
                  onChange={(event) => handleInputChange(event, 'drawing_number')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Service</label>
                <input
                  name='service'
                  type='text'
                  value={cardData.row !== null ? cardData.row.service : null}
                  onChange={(event) => handleInputChange(event, 'service')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Material</label>
                <input
                  name='material'
                  type='text'
                  value={cardData.row !== null ? cardData.row.material : null}
                  onChange={(event) => handleInputChange(event, 'material')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Inservice Date</label>
                <input
                  name='inservice_date'
                  type='date'
                  value={cardData.row !== null ? cardData.row.inservice_date : null}
                  onChange={(event) => handleInputChange(event, 'inservice_date')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Pipe Size</label>
                <input
                  name='pipe_size'
                  type='number'
                  value={cardData.row !== null ? cardData.row.pipe_size : null}
                  onChange={(event) => handleInputChange(event, 'pipe_size')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Original Thickness</label>
                <input
                  name='original_thickness'
                  type='number'
                  value={cardData.row !== null ? cardData.row.original_thickness : null}
                  onChange={(event) => handleInputChange(event, 'original_thickness')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Stress</label>
                <input
                  name='stress'
                  type='number'
                  value={cardData.row !== null ? cardData.row.stress : null}
                  onChange={(event) => handleInputChange(event, 'stress')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Joint Efficiency</label>
                <input
                  name='joint_efficiency'
                  type='number'
                  value={cardData.row !== null ? cardData.row.joint_efficiency : null}
                  onChange={(event) => handleInputChange(event, 'joint_efficiency')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Ca</label>
                <input
                  name='ca'
                  type='number'
                  value={cardData.row !== null ? cardData.row.ca : null}
                  onChange={(event) => handleInputChange(event, 'ca')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Design Life</label>
                <input
                  name='design_life'
                  type='number'
                  value={cardData.row !== null ? cardData.row.design_life : null}
                  onChange={(event) => handleInputChange(event, 'design_life')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Design Pressure</label>
                <input
                  name='design_pressure'
                  type='number'
                  value={cardData.row !== null ? cardData.row.design_pressure : null}
                  onChange={(event) => handleInputChange(event, 'design_pressure')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Operating Pressure</label>
                <input
                  name='operating_pressure'
                  type='number'
                  value={cardData.row !== null ? cardData.row.operating_pressure : null}
                  onChange={(event) => handleInputChange(event, 'operating_pressure')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Design Temperature</label>
                <input
                  name='design_temperature'
                  type='number'
                  value={cardData.row !== null ? cardData.row.design_temperature : null}
                  onChange={(event) => handleInputChange(event, 'design_temperature')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Operating Temperature</label>
                <input
                  name='operating_temperature'
                  type='number'
                  value={cardData.row !== null ? cardData.row.operating_temperature : null}
                  onChange={(event) => handleInputChange(event, 'operating_temperature')}
                />
              </div>
            </div>
            <div className={styles.popupButtonGroup}>
              <button className={styles.submitButton} type="submit">Submit</button>
              {
                data.find((row) => row.id === cardData.row.id) &&
                <button className={styles.deleteButton} onClick={(event) => handleDelete(event)}>Delete</button>
              }
            </div>
          </form>
        </Card>
      }

      <Card title="PIPING">
        <button className={styles.addButton} onClick={() => showPopup(null)}>Add Piping</button>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Line Number</th>
              <th>Location</th>
              <th>From</th>
              <th>To</th>
              <th>Pipe Size (Inch)</th>
              <th>Service</th>
              <th>Material</th>
              <th></th>
            </tr>
            {
              data?.map((row) => (
                <tr key={row.id}>
                  <td>{row.line_number}</td>
                  <td>{row.location}</td>
                  <td>{row.from}</td>
                  <td>{row.to}</td>
                  <td>{row.pipe_size}</td>
                  <td>{row.service}</td>
                  <td>{row.material}</td>
                  <td className={styles.tableButtons}>
                    <button onClick={() => showPopup(row.line_number)}>Info</button>
                    <button>
                      <Link
                        href={{
                          pathname: '/detail',
                          query: { line_number: row.line_number },
                        }}
                      >
                        Detail
                      </Link>
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </Card>
    </div>
  );
}
