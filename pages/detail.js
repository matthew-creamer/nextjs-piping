import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Card } from '../components/card';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Detail() {
  const router = useRouter();
  const { line_number } = router.query;
  const [cardData, setCardData] = useState([
    { card: 'CML', visible: false, row: null, search: 0 },
    { card: 'TP', visible: false, row: null, search1: 0, search2: 0 },
    { card: 'Thickness', visible: false, row: null }
  ]);
  const GetCard = (card) => {
    const foundCard = cardData?.find((item) => item.card === (card === 'Thickness' ? card : card.toUpperCase()));
    return foundCard ? foundCard : { card: '', visible: false, row: null };
  };
  const { data: cmlData, error: cmlError } = useSWR(`/api/cml?param1=${line_number}`, fetcher);
  const { data: tpData, error: tpError } = useSWR(`/api/test_point?param1=${line_number}&param2=${cardData ? GetCard('CML').search : 0}`, fetcher);
  const { data: thicknessData, error: thicknessError } = useSWR(`/api/thickness?param1=${line_number}&param2=${cardData ? GetCard('TP').search1 : 0}&param3=${cardData ? GetCard('TP').search2 : 0}`, fetcher);

  const showPopup = (card, value) => {
    setCardData((prevCardData) => {
      const updatedCardData = prevCardData.map((item) => ({
        ...item,
        visible: false,
      }));

      const itemIndex = updatedCardData.findIndex((item) => item.card === card);

      if (itemIndex !== -1) {
        if (value !== null) {
          let selectedData;
          if (card === 'CML') {
            selectedData = cmlData;
          } else if (card === 'TP') {
            selectedData = tpData;
          } else if (card === 'Thickness') {
            selectedData = thicknessData;
          } else {
            selectedData = null;
          }
          const selectedRow = selectedData ? selectedData.find((row) => row.id === value) : null;
          if (selectedRow) {
            updatedCardData[itemIndex].visible = true;
            updatedCardData[itemIndex].row = selectedRow;
          }
        } else {
          let newRow;
          if (card === 'CML') {
            newRow = {
              line_number: line_number,
              cml_number: 0,
              cml_description: ''
            };
          } else if (card === 'TP') {
            newRow = {
              line_number: line_number,
              cml_number: GetCard('CML').search,
              tp_number: 0,
              tp_description: 0,
              note: '',
            };
          } else if (card === 'Thickness') {
            newRow = {
              line_number: line_number,
              cml_number: GetCard('TP').search1,
              tp_number: GetCard('TP').search2,
              inspection_date: 0,
              actual_thickness: 0,
            };
          }

          updatedCardData[itemIndex].visible = true;
          updatedCardData[itemIndex].row = newRow;
        }
      }

      return updatedCardData;
    });
  };

  const hidePopup = (card) => {
    const updatedCardData = [...cardData];

    const itemIndex = updatedCardData.findIndex(item => item.card === card);

    if (itemIndex !== -1) {
      updatedCardData[itemIndex].visible = false;
      setCardData(updatedCardData);
    }
  };

  const updateSearch = (cardType, newSearchValue1, newSearchValue2) => {
    setCardData((prevCardData) => {
      return prevCardData.map((card) => {
        if (card.card === cardType) {
          let updatedCard = { ...card };
          if (newSearchValue2) {
            updatedCard.search1 = newSearchValue1;
            updatedCard.search2 = newSearchValue2;
          } else {
            updatedCard.search = newSearchValue1;
          }
          return updatedCard;
        } else {
          let updatedCard = { ...card };
          if (updatedCard.search1) updatedCard.search1 = 0;
          if (updatedCard.search2) updatedCard.search2 = 0;
          return updatedCard;
        }
      });
    });
  };

  const handleInputChange = (event, card, fieldName) => {
    setCardData((prevState) =>
      prevState.map((item) =>
        item.card === card
          ? {
            ...item,
            row: {
              ...item.row,
              [fieldName]: event.target.value,
            },
          }
          : item
      )
    );
  };

  async function onSubmit(event, card) {
    event.preventDefault();

    const response = await fetch(`/api/${card === 'tp' ? 'test_point' : card.toLowerCase()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(GetCard(card).row),
    });

    if (response.status === 200 || response.status === 201) {
      mutate('/api/cml');
      mutate(`/api/test_point?param1=${line_number}&param2=${cardData ? GetCard('CML').search : 0}`);
      mutate(`/api/thickness?param1=${line_number}&param2=${cardData ? GetCard('TP').search1 : 0}&param3=${cardData ? GetCard('TP').search2 : 0}`);
    }
  }

  const handleDelete = async (event, card, value) => {
    event.preventDefault();
    const response = await fetch(`/api/${card}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: value ? value : GetCard(card).row.id }),
    });

    if (response.status === 204) {
      mutate('/api/cml');
      mutate(`/api/test_point?param1=${line_number}&param2=${cardData ? GetCard('CML').search : 0}`);
      mutate(`/api/thickness?param1=${line_number}&param2=${cardData ? GetCard('TP').search1 : 0}&param3=${cardData ? GetCard('TP').search2 : 0}`);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Piping</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link className={styles.backButton} href={{ pathname: '/' }}>Back</Link>

      {
        GetCard('CML').visible &&
        <Card title="PIPING CML" closePopup={() => hidePopup('CML')}>
          <form onSubmit={(event) => onSubmit(event, 'cml')}>
            <div className={styles.popup}>
              <div className={styles.inputContainer}>
                <label>Line Number</label>
                <input
                  name='line_number'
                  type='text'
                  value={GetCard('CML').row.line_number}
                  disabled
                  onChange={(event) => handleInputChange(event, 'CML', 'line_number')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>CML Number</label>
                <input
                  name='cml_number'
                  type='number'
                  value={GetCard('CML').row.cml_number}
                  onChange={(event) => handleInputChange(event, 'CML', 'cml_number')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>CML Description</label>
                <input
                  name='cml_description'
                  type='text'
                  value={GetCard('CML').row.cml_description}
                  onChange={(event) => handleInputChange(event, 'CML', 'cml_description')}
                />
              </div>
            </div>
            <div className={styles.popupButtonGroup}>
              <button className={styles.submitButton} type="submit">Submit</button>
              {
                cmlData.find((row) => row.id === GetCard('CML').row.id) &&
                <button className={styles.deleteButton} onClick={(event) => handleDelete(event, 'cml')}>Delete</button>
              }
            </div>
          </form>
        </Card>
      }

      {
        GetCard('TP').visible &&
        <Card title="PIPING TP" closePopup={() => hidePopup('TP')}>
          <form onSubmit={(event) => onSubmit(event, 'tp')}>
            <div className={styles.popup}>
              <div className={styles.inputContainer}>
                <label>Line Number</label>
                <input
                  name='line_number'
                  type='text'
                  value={GetCard('TP').row.line_number}
                  disabled
                  onChange={(event) => handleInputChange(event, 'TP', 'line_number')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>CML Number</label>
                <input
                  name='cml_number'
                  type='number'
                  value={GetCard('TP').row.cml_number}
                  disabled
                  onChange={(event) => handleInputChange(event, 'TP', 'cml_number')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>TP Number</label>
                <input
                  name='tp_number'
                  type='number'
                  value={GetCard('TP').row.tp_number}
                  onChange={(event) => handleInputChange(event, 'TP', 'tp_number')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>TP Description</label>
                <input
                  name='tp_description'
                  type='number'
                  value={GetCard('TP').row.tp_description}
                  onChange={(event) => handleInputChange(event, 'TP', 'tp_description')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Note</label>
                <input
                  name='note'
                  type='text'
                  value={GetCard('TP').row.note}
                  onChange={(event) => handleInputChange(event, 'TP', 'note')}
                />
              </div>
            </div>
            <div className={styles.popupButtonGroup}>
              <button className={styles.submitButton} type="submit">Submit</button>
              {
                cmlData.find((row) => row.id === GetCard('TP').row.id) &&
                <button className={styles.deleteButton} onClick={(event) => handleDelete(event, 'tp')}>Delete</button>
              }
            </div>
          </form>
        </Card>
      }

      {
        GetCard('Thickness').visible &&
        <Card title="PIPING Thickness" closePopup={() => hidePopup('Thickness')}>
          <form onSubmit={(event) => onSubmit(event, 'Thickness')}>
            <div className={styles.popup}>
              <div className={styles.inputContainer}>
                <label>Line Number</label>
                <input
                  name='line_number'
                  type='text'
                  value={GetCard('Thickness').row.line_number}
                  disabled
                  onChange={(event) => handleInputChange(event, 'Thickness', 'line_number')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>CML Number</label>
                <input
                  name='cml_number'
                  type='number'
                  value={GetCard('Thickness').row.cml_number}
                  disabled
                  onChange={(event) => handleInputChange(event, 'Thickness', 'cml_number')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>TP Number</label>
                <input
                  name='tp_number'
                  type='number'
                  value={GetCard('Thickness').row.tp_number}
                  disabled
                  onChange={(event) => handleInputChange(event, 'Thickness', 'tp_number')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Inspection Date</label>
                <input
                  name='inspection_date'
                  type='date'
                  value={GetCard('Thickness').row.inspection_date}
                  onChange={(event) => handleInputChange(event, 'Thickness', 'inspection_date')}
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Actual Thickness</label>
                <input
                  name='actual_thickness'
                  type='number'
                  value={GetCard('Thickness').row.actual_thickness}
                  onChange={(event) => handleInputChange(event, 'Thickness', 'actual_thickness')}
                />
              </div>
            </div>
            <div className={styles.popupButtonGroup}>
              <button className={styles.submitButton} type="submit">Submit</button>
              {
                cmlData.find((row) => row.id === GetCard('Thickness').row.id) &&
                <button className={styles.deleteButton} onClick={(event) => handleDelete(event, 'thickness')}>Delete</button>
              }
            </div>
          </form>
        </Card>
      }

      <Card title="PIPING">
        <div className={styles.lineNumber}>
          <label>Line Number</label>
          <input type="text" disabled value={line_number} />
        </div>
        <Card title="CML" child button={<button className={styles.addButtonChild} onClick={() => showPopup('CML', null)}>Add CML</button>}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th>CML Number</th>
                <th>CML Description</th>
                <th>Actual Outside Diameter</th>
                <th>Design Thickness (mm)</th>
                <th>Structural Thickness (mm)</th>
                <th>Required Thickness (mm)</th>
                <th></th>
              </tr>
              {
                cmlData?.map((row) => (
                  <tr key={row.id}>
                    <td>{row.cml_number}</td>
                    <td>{row.cml_description}</td>
                    <td>{row.actual_outside_diameter}</td>
                    <td>{row.design_thickness}</td>
                    <td>{row.structural_thickness}</td>
                    <td>{row.required_thickness}</td>
                    <td className={styles.tableButtons}>
                      <button onClick={() => updateSearch('CML', row.cml_number)}>View TP</button>
                      <button onClick={() => showPopup('CML', row.id)}>Edit</button>
                      <button onClick={(event) => handleDelete(event, 'cml', row.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </Card>

        <Card title="TEST POINT" child button={<button className={styles.addButtonChild} onClick={() => showPopup('TP', null)}>Add TP</button>}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th>TP Number</th>
                <th>TP Description</th>
                <th>Note</th>
                <th></th>
              </tr>
              {
                tpData?.map((row) => (
                  <tr key={row.id}>
                    <td>{row.tp_number}</td>
                    <td>{row.tp_description}</td>
                    <td>{row.note}</td>
                    <td className={styles.tableButtons}>
                      <button onClick={() => updateSearch('TP', row.cml_number, row.tp_number)}>View Thickness</button>
                      <button onClick={() => showPopup('TP', row.id)}>Edit</button>
                      <button onClick={(event) => handleDelete(event, 'test_point', row.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </Card>

        <Card title="THICKNESS" child button={<button className={styles.addButtonChild} onClick={() => showPopup('Thickness', null)}>Add Thickness</button>}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th>Inspection Date</th>
                <th>Actual Thickness (mm)</th>
                <th></th>
              </tr>
              {
                thicknessData?.map((row) => (
                  <tr key={row.id}>
                    <td>{row.inspection_date}</td>
                    <td>{row.actual_thickness}</td>
                    <td className={styles.tableButtons}>
                      <button onClick={() => showPopup('Thickness', row.id)}>Edit</button>
                      <button onClick={(event) => handleDelete(event, 'thickness', row.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </Card>
      </Card>
    </div>
  );
}
