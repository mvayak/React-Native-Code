import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import ModalContextMenu from './ModalContextMenu';
import {Portal} from 'react-native-paper';
import ListDivider from './../content/ListDivider';
import LorylistIcon from './../LorylistIcon';
import helpers from './../../helpers';

import {colors} from '../../assets/styles';

const iconMap = {
  'food fuel kj': {
    name: 'nv-energy',
    size: 20,
  },
  'food fuel kcal': {
    name: 'nv-kcal',
    size: 16,
  },
  fat: {
    name: 'nv-fat',
    size: 20,
  },
  'saturated fatty acid': {
    name: 'nv-saturated-fat',
    size: 20,
  },
  carbohydrate: {
    name: 'nv-total-carbohydrate',
    size: 25,
  },
  sugar: {
    name: 'nv-sugar',
    size: 20,
  },
  protein: {
    name: 'nv-protein',
    size: 16,
  },
  salt: {
    name: 'nv-sodium',
    size: 20,
  },
};

const infoMap = {
  'food fuel kj': {
    info:
      'Zum Erhalt unserer Körperfunktionen benötigen wir Energie, die unser Körper durch die „Verbrennung“ der Hauptnährstoffe Kohlenhydrate, Fett und Eiweiß gewinnt. Je höher der Brennwert, umso mehr musst du dich bewegen, um die zugeführte Energie zu verbrauchen. Die Angabe in Kilojoule (kj) ist moderner.',
  },
  'food fuel kcal': {
    info:
      'Zum Erhalt unserer Körperfunktionen benötigen wir Energie, die unser Körper durch die „Verbrennung“ der Hauptnährstoffe Kohlenhydrate, Fett und Eiweiß gewinnt. Je höher der Brennwert, umso mehr musst du dich bewegen, um die zugeführte Energie zu verbrauchen. Die Angabe in Kilokalo (kcal) ist veraltet.',
  },
  fat: {
    info:
      'Der gesamte Fettgehalt im Produkt. Fett liefert Energie und ist Träger fettlöslicher Vitamine. Es besteht u.a.aus Fettsäuren.Dabei unterscheidet man ungesättigte und gesättigte Fettsäuren. Fett liefert mehr als doppelt so viel Energie wie Kohlenhydrate oder Eiweiß, nämlich pro 1 g ca. 9 kcal.',
  },
  'saturated fatty acid': {
    info:
      'Bezeichnet den Gehalt der Fette, die – im Übermaß aufgenommen – zu Gesundheitsproblemen führen können.',
  },
  carbohydrate: {
    info:
      'Kohlenhydrate sind die gesamt enthaltenen Kohlenhydrate. Zucker und Stärke sind die am schnellsten verfügbaren Energielieferanten. Zucker gelangt besonders schnell in Blut, Gehirn und Muskeln. In Brot, Kartoffeln, Reis oder Nudeln stecken viele Kohlenhydrate in Form von Stärke.',
  },
  sugar: {
    info:
      'Die Nährwertangabe „Zucker“ umfasst z. B. Kristallzucker, Fruchtzucker und Milchzucker. 1 g Kohlenhydrate bzw.Zucker liefert ca. 4 kcal.',
  },
  protein: {
    info:
      'Eiweiß wird überall im Körper benötigt, z. B. für Wachstum, Muskel- und Zellaufbau.Eiweiß nimmt man vor allem über Fleisch, Fisch, Eier, Milch und Milchprodukte auf, aber auch über Getreide, Hülsenfrüchte oder Kartoffeln. 1 g Eiweiß liefert ca. 4 kcal.',
  },
  salt: {
    info:
      'Salz (Natriumchlorid) ist die Hauptquelle für Natrium, einem lebenswichtigen Mineralstoff für den menschlichen Körper. Natrium reguliert den Flüssigkeits- und Mineralhaushalt und schafft damit die Basis für einen funktionierenden Stoffwechsel. Da es nicht selbst vom Körper gebildet werden kann, muss Natrium durch die Nahrung aufgenommen werden und ist deshalb ein elementarer Bestandteil einer gesunden Ernährung.',
  },
};

const NutritionalValuesModal = React.forwardRef((props, ref) => {
  const {items} = props;

  const [visibleInfo, setVisibleInfo] = useState(null);

  return (
    <Portal>
      <ModalContextMenu
        ref={ref}
        title="Nährwertangaben"
        fitContent
        closeButtonVisible>
        <View style={s.container}>
          <Text style={s.helpText}>
            Tippe auf eine Nährwertangabe, um eine Erklärung zu sehen.
          </Text>

          {items.map((item, index) => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  if (visibleInfo === item.name) {
                    setVisibleInfo(null);
                  } else {
                    setVisibleInfo(item.name);
                  }
                }}
                style={s.item}>
                <View style={s.nameIconWrapper}>
                  {typeof iconMap[item.name] !== 'undefined' && (
                    <Text style={s.iconWrapper}>
                      <LorylistIcon
                        name={iconMap[item.name].name}
                        size={iconMap[item.name].size}
                        style={s.icon}
                      />
                    </Text>
                  )}

                  <Text style={s.name}>{item.display_name}</Text>
                </View>
                <Text style={s.value}>
                  {item.value % 1 == 0
                    ? helpers.number_format(item.value, 0, ',', '.')
                    : helpers.number_format(item.value, 2, ',', '.')}
                  {item.unit ? ' ' + item.unit.shortcode : ''}
                </Text>
              </TouchableOpacity>

              {/* Info */}
              {typeof infoMap[item.name] !== 'undefined' &&
                visibleInfo === item.name && (
                  <Text style={s.info}>{infoMap[item.name].info}</Text>
                )}

              {/* Divider */}
              <ListDivider simple={true} style={s.divider} />
            </View>
          ))}
        </View>
      </ModalContextMenu>
    </Portal>
  );
});

export default NutritionalValuesModal;

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  helpText: {
    fontFamily: 'CircularStd-Book',
    color: colors.gray,
    marginBottom: 20,
    fontSize: 14,
    marginTop: -10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  nameIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 30,
    height: 30,
    marginRight: 10,
    paddingTop: 5,
    textAlign: 'center',
  },
  icon: {
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'CircularStd-Book',
    fontSize: 16,
    color: colors.black,
    height: 30,
    paddingTop: 5,
  },
  value: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 16,
    color: colors.black,
    textAlign: 'right',
    paddingTop: 5,
  },
  info: {
    fontFamily: 'CircularStd-Book',
    fontSize: 14,
    color: colors.gray,
    paddingLeft: 40,
    paddingRight: 20,
    paddingBottom: 10,
  },
  divider: {
    marginTop: 8,
    marginBottom: 8,
  },
});
