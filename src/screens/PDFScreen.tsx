import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { WebView } from 'react-native-webview';
import { ScrollView } from 'react-native-gesture-handler';
import { isWeb } from '@layout';
import get from 'lodash/get';
import { getGameData, EGameDetail, getDateString } from '@utils';
import { useDispatch, useSelector } from 'react-redux';
import { IGameDetail } from './GameScreen';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        alignItems: 'center'
    },
    button: {
        margin: 20,
        maxWidth: 200
    }
});

export default function PDFScreen({ route }: any) {
    const dispatch = useDispatch();

    const gameId = get(route, 'params.gameId', '');
    const gameData = getGameData(gameId);
    const currentSeason = useSelector(state => get(state, 'auth.profile.season', '20192020'));
    const gameUserData: IGameDetail = useSelector(state =>
        get(state, `userGames.seasons.${currentSeason}.${gameId}`, {})
    );

    console.log('aaa', gameData, gameUserData);

    const val = 'MARTIN';
    const gamePlayed = true;
    const gamePage = `
      <div class="flex-container" style="justify-content: center">
        <div style="width: 480px; margin: 5px 0px;">
          <strong style="text-align: center;">SLOVENSKÝ ZVÄZ ĽADOVÉHO HOKEJA VYÚČTOVANIE</strong>
        </div>
      </div>
      <div class="flex-container" style="justify-content: center">
        <div style="width: 580px; margin: 0px;">
          <span style="text-align: center;">CESTOVNÝCH VÝDAVKOV ROZHODCU, INŠTRUKTORA
        ROZHODCOV A VIDEOBRÁNKOVÉHO ROZHODCU</span>
        </div>
      </div>
      <div class="flex-container">
        <div style="flex-grow: 3">Súťaž:
          <div class="text-dotted">${gameData.ligue}</div>
        </div>
        <div style="flex-grow: 2">Číslo stretnutia: 
          <div class="text-dotted">${gameData.gameId}</div>
        </div>
        <div style="flex-grow: 3">Dátum stretnutia: 
          <div class="text-dotted">${gameData.date}</div>
        </div>
      </div>
      <div class="flex-container">
        <div style="flex-grow: 3">Úradný začiatok stretnutia (čas):
          <div class="text-dotted">${gameData.time}</div>
        </div>
        <div style="flex-grow: 2">Stretnutie sa hralo v pracovný deň pred 16:00 hod:
          <strong> ANO</strong>
          <input type="checkbox" ${gameUserData.playedBefore && 'checked'}/>
        </div>
      </div>
      <div class="flex-container">
        <div style="width: 50%">Domáci: 
          <div class="text-dotted">${gameData.home}</div>
        </div>
        <div style="width: 50%">Hostia: 
          <div class="text-dotted">${gameData.away}</div>
        </div>
      </div>
      <div class="flex-container">
        <div style="flex-grow: 1">Stretnutie sa hralo:
          <strong>HRALO</strong>
          <input type="checkbox" ${gameUserData.played && 'checked'}/>- 
          <strong>NEHRALO</strong>
          <input type="checkbox" ${!gameUserData.played && 'checked'}/>na ZŠ v:
          <div class="text-dotted">${gameData.stadium}</div>
        </div>
      </div>
      <div class="flex-container">
        <div style="flex-grow: 1">Meno a priezvisko: 
          <div class="text-dotted"> EXTRALIGA</div>
        </div>
        <div style="flex-grow: 1">Bydlisko /mesto: 
          <div class="text-dotted"> 123</div>
        </div>
      </div>
      <div class="separator" style="height: 2px"/>
      <div class="flex-container">
        <div style="width: 50%">1. hlavný rozhodca: 
          <div class="text-dotted">${
              gameUserData.refs?.find(r => r.refType === EGameDetail.H1)?.name || ''
          }</div>
        </div>
        <div style="width: 50%">2. hlavný rozhodca: 
          <div class="text-dotted">${
              gameUserData.refs?.find(r => r.refType === EGameDetail.H2)?.name || ''
          }</div>
        </div>
      </div>
      <div class="flex-container">
        <div style="width: 50%">1. čiarový rozhodca: 
          <div class="text-dotted">${
              gameUserData.refs?.find(r => r.refType === EGameDetail.C1)?.name || ''
          }</div>
        </div>
        <div style="width: 50%">2. čiarový rozhodca: 
          <div class="text-dotted">${
              gameUserData.refs?.find(r => r.refType === EGameDetail.C2)?.name || ''
          }</div>
        </div>
      </div>
      <div class="flex-container">
        <div style="width: 50%">Inštruktor rozhodcov: 
          <div class="text-dotted">${
              gameUserData.refs?.find(r => r.refType === EGameDetail.I)?.name || ''
          }</div>
        </div>
        <div style="width: 50%">Videobránkový rozhodca: 
          <div class="text-dotted">${
              gameUserData.refs?.find(r => r.refType === EGameDetail.V)?.name || ''
          }</div>
        </div>
      </div>
      <div class="separator"/>
      <div class="flex-container">
        <div style="width: 60%">Odchod z miesta bydliska do: 
          <div class="text-dotted">${gameUserData.fromCity || ''}</div>
        </div>
        <div style="width: 25%">dňa: 
          <div class="text-dotted">${
              gameUserData.fromDay ? getDateString(new Date(gameUserData.fromDay)) : ''
          }</div>
        </div>
        <div style="width: 15%">o: 
          <div class="text-dotted">${gameUserData.fromTime || ''}</div>hod.
        </div>
      </div>
      <div class="flex-container">
        <div style="width: 60%">Príchod do miesta bydliska z: 
          <div class="text-dotted">${gameUserData.toCity || ''}</div>
        </div>
        <div style="width: 25%">dňa: 
          <div class="text-dotted">${
              gameUserData.toDay ? getDateString(new Date(gameUserData.toDay)) : ''
          }</div>
        </div>
        <div style="width: 15%">o: 
          <div class="text-dotted">${gameUserData.toTime || ''}</div>hod.
        </div>
      </div>
      <div class="separator"/>
      <div class="flex-container">
        <div style="width: 70%">Vodič: 
          <div class="text-dotted"> Martin</div>
        </div>
        <div style="width: 30%">EČV: 
          <div class="text-dotted"> KS-100BS</div>
        </div>
      </div>
      <div class="flex-container">
        <div style="width: 100%">Spolucestujúci: 
          <div class="text-dotted">${gameUserData.refsInCar?.toString() || ''}</div>
        </div>
      </div>
      <div class="flex-container">
        <div style="width: 100%">Odkiaľ a kam – presný popis cesty tam aj späť: 
          <div class="text-dotted">${gameUserData.road || ''}</div>
        </div>
      </div>
      <div class="flex-container">
        <div style="width: 100%">
          <div class="text-dotted"> ...</div>
        </div>
      </div>
      <div class="separator"/>
      <div class="flex-container" style="line-height: 20px">
        <div style="flex-grow: 1">(Vyplňuje len vodič !) </div>
        <div>Opakované stretnutie :
          <strong>ANO</strong>
          <input type="checkbox" ${gameUserData.isRepeatedGame && 'checked'}/>- 
          <strong>NIE</strong>
          <input type="checkbox" ${!gameUserData.isRepeatedGame && 'checked'}/>
        </div>
      </div>
      <div class="flex-container">
        <div style="width: 65%">V uvedený deň som rozhodoval dve stretnutia :
          <strong>ANO</strong>
          <input type="checkbox" ${gameUserData.isSecondGame && 'checked'}/>- 
          <strong>NIE</strong>
          <input type="checkbox" ${!gameUserData.isSecondGame && 'checked'}/>
        </div>
        <div style="width: 35%">číslo druhého stretnutia: 
          <div class="text-dotted">${gameUserData.secondGame || ''}</div>
        </div>
      </div>
      <div class="flex-container">
        <div style="width: 100%">
          <strong>Poznámka:</strong>
          <div class="text-dotted">${gameUserData.notes || ''}</div>
        </div>
      </div>
      <div class="flex-container">
        <div style="width: 100%">
          <div class="text-dotted"> ...</div>
        </div>
      </div>
      <div class="flex-container">
        <div style="width:25%; margin: 10px 20px 0px;">Paušál: EUR: 
          <div class="text-dotted">${gameUserData.rateMoney || ''}</div>
        </div>
        <div style="width: 30%; margin: 10px 20px 0px;">Počet odjazdených km: 
          <div class="text-dotted">${gameUserData.distance || ''}</div>
        </div>
      </div>
      <div class="flex-container">
        <div style="width: 25%;line-height: 13px; font-size: 11px; margin: 0px 20px">( podľa smernice)</div>
        <div style="width: 30%;line-height: 13px; font-size: 11px; margin: 0px 20px">( podľa kilometrovníka SZĽH)</div>
      </div>
      <div style="margin: 5px 20px 20px">
        <div class="flex-container">
          <div class="money-label">
            <strong>Stravné:</strong>
          </div>
          <div style="width:150px">EUR: 
            <div class="text-dotted">${gameUserData.mealMoney || ''}</div>
          </div>
        </div>
        <div class="flex-container">
          <div class="money-label">
            <strong>Cestovné</strong> (Priložiť cestovné lístky alebo podľa kilometrovného!):
          </div>
          <div style="width:150px">EUR: 
            <div class="text-dotted">${gameUserData.travelMoney || ''}</div>
          </div>
        </div>
        <div class="flex-container">
          <div class="money-label">
            <strong>Sadzba mesto</strong> (jazda v meste):
          </div>
          <div style="width:150px">EUR: 
            <div class="text-dotted">${gameUserData.rateCityMoney || ''}</div>
          </div>
        </div>
        <div class="flex-container">
          <div class="money-label">
            <strong>Nocľažné</strong> (Priložiť doklady!):
          </div>
          <div style="width:150px">EUR: 
            <div class="text-dotted">${gameUserData.nightMoney || ''}</div>
          </div>
        </div>
        <div class="flex-container">
          <div class="money-label">
            <strong>Poštovné:</strong>
          </div>
          <div style="width:150px">EUR: 
            <div class="text-dotted">${gameUserData.postMoney || ''}</div>
          </div>
        </div>
        <div class="flex-container">
          <div class="money-label">
            <strong>Ostatné:</strong>
          </div>
          <div  style="width:150px">EUR: 
            <div class="text-dotted">${gameUserData.otherMoney || ''}</div>
          </div>
        </div>
        <div class="flex-container">
          <div class="money-label">
            <strong>SPOLU</strong> (Bez sumy paušálu!):
          </div>
          <div style="width:150px">EUR: 
            <div class="text-dotted">${gameUserData.togetherMoney || ''}</div>
          </div>
        </div>
        <div class="flex-container" style="margin-top: 25px; flex-direction: column; align-items: flex-end">
          <div class="text-dotted" style="border-bottom: 1px solid; width: 180px; margin-right: 10px"></div>
          <div style="width:120px; line-height: 13px; font-size: 11px; margin: 0px 20px">Podpis účtujúceho</div>
        </div>
      </div>
      <div class="flex-container" style="margin-top: -25px">
        <div style="width: 30%;">Kontroloval: 
          <div class="text-dotted"></div>
        </div>
        <div style="width: 15%;">dňa: 
          <div class="text-dotted"></div>
        </div>
      </div>
      <div class="flex-container" style="margin-bottom: 38px">
        <div style="margin: 5px 0px;">
          <strong style="text-align: center;">Vyučtovanie bude spracované iba v prípade vyplnenia, doloženia originálnych príslušných dokladov a podpísania účtujúceho.</strong>
        </div>
      </div>
    `;

    const html = `
    <!DOCTYPE html>
      <html>
      <head>
      <style>
        body { margin: 25px, width: 595px;}
      
        .flex-container {
          display: flex;
          align-items: stretch;
        }
        
        .flex-container > div {
          display: flex;
          align-items: flex-start;
          margin-top: 3px;
          text-align: left;
          font: 20px 'Arial';
          line-height: 32px;
        }
        .text-dotted {
          flex-grow: 1;
          padding-left: 2px;
          font: 22px 'Arial';
          font-weight: 600;
          height: 24px;
          border-bottom: 1px dotted;
        }
        .money-label {
          flex-grow: 1; 
          justify-content: flex-end;
          margin-right: 50px
        }
        .separator {
          height: 1px;
          background-color:black;
        }
      </style>
      </head>
      <body>
        ${gamePage}
        ${gamePage}
        ${gamePage}
        ${gamePage}
        ${gamePage}
      </body>
    </html>    
  `;

    async function execute() {
        const { uri } = await Print.printToFileAsync({
            html: html
        });
        console.log(uri);

        Sharing.shareAsync(uri);
    }

    return (
        <>
            {isWeb ? (
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
                    <View style={styles.button}>
                        <Button title="Generuj" onPress={() => execute()} />
                    </View>
                    <div
                        style={{ maxWidth: 920, borderWidth: 1, borderColor: 'red' }}
                        dangerouslySetInnerHTML={{
                            __html: html
                        }}
                    />
                </ScrollView>
            ) : (
                <View style={styles.container}>
                    <Button title="Print and Share" onPress={() => execute()} />
                    <WebView
                        source={{ html: html }}
                        originWhitelist={['*']}
                        style={{ marginHorizontal: 10 }}
                    />
                </View>
            )}
        </>
    );
}
