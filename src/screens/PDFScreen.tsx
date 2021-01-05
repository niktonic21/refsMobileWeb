import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { WebView } from 'react-native-webview';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default function PDFScreen({ navigation }: any) {
    const val = 'MARTIN';
    const gamePlayed = true;
    const html = `<!DOCTYPE html>
    <html>
    <head>
    <style>
    body {margin: 25px}
    
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
      line-height: 35px;
    }
    .text-dotted {
      flex-grow: 1;
      font: 17px 'Arial';
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
    <div class="flex-container" style="justify-content: center">
    <div style="width: 280px; margin: 5px 0px;">
      <strong style="text-align: center;">SLOVENSKÝ ZVÄZ ĽADOVÉHO HOKEJA VYÚČTOVANIE</strong> 
    </div> 
    </div>
    <div class="flex-container" style="justify-content: center">
      <div style="width: 380px; margin: 0px;">
        <span style="text-align: center;">CESTOVNÝCH VÝDAVKOV ROZHODCU, INŠTRUKTORA
    ROZHODCOV A VIDEOBRÁNKOVÉHO ROZHODCU</span> 
      </div> 
    </div>
    
    <div class="flex-container">
      <div style="flex-grow: 3">Súťaž:<div class="text-dotted"> EXTRALIGA</div></div>
      <div style="flex-grow: 2">Číslo stretnutia: <div class="text-dotted"> 123</div></div>
      <div style="flex-grow: 3">Dátum stretnutia: <div class="text-dotted"> 10.10.2020</div></div>
    </div>
    <div class="flex-container">
      <div style="flex-grow: 3">Úradný začiatok stretnutia (čas):<div class="text-dotted"> 10.10.2020</div></div>
      <div style="flex-grow: 2">Stretnutie sa hralo v pracovný deň pred 16:00 hod:<strong> ANO</strong><input type="checkbox" ${
          false && 'checked'
      }/>
      </div>
    </div>
    <div class="flex-container">
      <div style="width: 50%">Domáci: <div class="text-dotted"> EXTRALIGA</div></div>
      <div style="width: 50%">Hostia: <div class="text-dotted"> 123</div></div>
    </div>
    <div class="flex-container">
      <div style="flex-grow: 1">Stretnutie sa hralo:<strong>HRALO</strong><input type="checkbox" ${
          true && 'checked'
      }/>- <strong>NEHRALO</strong><input type="checkbox" ${
        false && 'checked'
    }/>na ZŠ v:<div class="text-dotted"> Kosice</div>
      </div>
    </div>
    <div class="flex-container">
      <div style="flex-grow: 1">Meno a priezvisko: <div class="text-dotted"> EXTRALIGA</div></div>
      <div style="flex-grow: 1">Bydlisko /mesto: <div class="text-dotted"> 123</div></div>
    </div>
    <div class="separator" style="height: 2px"/>
    <div class="flex-container">
      <div style="width: 50%">1. hlavný rozhodca: <div class="text-dotted"> ${val}</div></div>
      <div style="width: 50%">2. hlavný rozhodca: <div class="text-dotted"> meno</div></div>
    </div>
    <div class="flex-container">
      <div style="width: 50%">1. čiarový rozhodca: <div class="text-dotted"> meno</div></div>
      <div style="width: 50%">2. čiarový rozhodca: <div class="text-dotted"> meno</div></div>
    </div>
    <div class="flex-container">
      <div style="width: 50%">Inštruktor rozhodcov: <div class="text-dotted"> meno</div></div>
      <div style="width: 50%">Videobránkový rozhodca: <div class="text-dotted"> meno</div></div>
    </div>
    <div class="separator"/>
    <div class="flex-container">
      <div style="width: 60%">Odchod z miesta bydliska do: <div class="text-dotted"> meno</div></div>
      <div style="width: 25%">dňa: <div class="text-dotted"> meno</div></div>
      <div style="width: 15%">o: <div class="text-dotted"> meno</div>hod.</div>
    </div>
    <div class="flex-container">
      <div style="width: 60%">Príchod do miesta bydliska z: <div class="text-dotted"> meno</div></div>
      <div style="width: 25%">dňa: <div class="text-dotted"> meno</div></div>
      <div style="width: 15%">o: <div class="text-dotted"> meno</div>hod.</div>
    </div>
    <div class="separator"/>
    <div class="flex-container">
    <div style="width: 100%">Spolucestujúci: <div class="text-dotted"> spolucestujuci</div></div>
    </div>
    <div class="flex-container">
      <div style="width: 100%">Odkiaľ a kam – presný popis cesty tam aj späť: <div class="text-dotted"> cesta</div></div>
    </div>
    <div class="flex-container">
      <div style="width: 100%"><div class="text-dotted"> ...</div></div>
    </div>
    <div class="separator"/>
    <div class="flex-container" style="line-height: 20px">
      <div style="flex-grow: 1">(Vyplňuje len vodič !) </div>
      <div>Opakované stretnutie :<strong>ANO</strong><input type="checkbox" ${
          true && 'checked'
      }/>- <strong>NIE</strong><input type="checkbox" ${false && 'checked'}/></div>
    </div>
    <div class="flex-container">
    <div style="width: 65%">V uvedený deň som rozhodoval dve stretnutia :<strong>ANO</strong><input type="checkbox" checked/>- <strong>NIE</strong><input type="checkbox"/></div>
    <div style="width: 35%">číslo druhého stretnutia: <div class="text-dotted"> ecv</div></div>
    </div>
    <div class="flex-container">
      <div style="width: 100%"><strong>Poznámka:</strong><div class="text-dotted"> cesta</div></div>
    </div>
    <div class="flex-container">
      <div style="width: 100%"><div class="text-dotted"> ...</div></div>
    </div>
    <div class="flex-container">
      <div style="width:25%; margin: 10px 20px 0px;">Paušál: EUR: <div class="text-dotted"> vodic</div></div> 
      <div style="width: 30%; margin: 10px 20px 0px;">Počet odjazdených km: <div class="text-dotted"> ecv</div></div>
    </div>
    <div class="flex-container">
      <div style="width: 25%;line-height: 13px; font-size: 11px; margin: 0px 20px">( podľa smernice)</div>
      <div style="width: 30%;line-height: 13px; font-size: 11px; margin: 0px 20px">( podľa kilometrovníka SZĽH)</div>
    </div>
    <div style="margin: 5px 20px 20px">
      <div class="flex-container">
          <div class="money-label"><strong>Stravné:</strong></div>
          <div style="width:150px">EUR: <div class="text-dotted"> cesta</div></div>
      </div>
      <div class="flex-container">
          <div class="money-label"><strong>Cestovné</strong> (Priložiť cestovné lístky alebo podľa kilometrovného!):</div>
          <div style="width:150px">EUR: <div class="text-dotted"> cesta</div></div>
      </div>
      <div class="flex-container">
          <div class="money-label"><strong>Sadzba mesto</strong> (jazda v meste):</div>
          <div style="width:150px">EUR: <div class="text-dotted"> cesta</div></div>
      </div>
      <div class="flex-container">
          <div class="money-label"><strong>Nocľažné</strong> (Priložiť doklady!):</div>
          <div style="width:150px">EUR: <div class="text-dotted"> cesta</div></div>
      </div>
      <div class="flex-container">
          <div class="money-label"><strong>Poštovné:</strong></div>
          <div style="width:150px">EUR: <div class="text-dotted"> cesta</div></div>
      </div>
      <div class="flex-container">
        <div class="money-label"><strong>Ostatné:</strong></div>
          <div  style="width:150px">EUR: <div class="text-dotted"> cesta</div></div>
      </div>
      <div class="flex-container">
          <div class="money-label"><strong>SPOLU</strong> (Bez sumy paušálu!):</div>
          <div style="width:150px">EUR: <div class="text-dotted"> cesta</div></div>
      </div>
      <div class="flex-container" style="margin-top: 25px; flex-direction: column; align-items: flex-end">
          <div class="text-dotted" style="border-bottom: 1px solid; width: 180px; margin-right: 10px"></div>
          <div style="width:120px; line-height: 13px; font-size: 11px; margin: 0px 20px">Podpis účtujúceho</div>
      </div>
    </div> 
    <div class="flex-container">
      <div style="width: 30%;">Kontroloval: <div class="text-dotted"></div></div>
      <div style="width: 15%;">dňa: <div class="text-dotted"></div></div>
    </div>
    <div class="flex-container">
      <div style="margin: 5px 0px;">
        <strong style="text-align: center;">Vyučtovanie bude spracované iba v prípade vyplnenia, doloženia originálnych príslušných dokladov a podpísania účtujúceho.</strong> 
      </div> 
    </div>
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
        <View style={styles.container}>
            <Button title="Print and Share" onPress={() => execute()} />
            <WebView
                source={{ html: html }}
                originWhitelist={['*']}
                style={{ marginHorizontal: 10 }}
            />
        </View>
    );
}
