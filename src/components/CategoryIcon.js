/**
 * CategoryIcon icon set component.
 * Usage: <CategoryIcon name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
const glyphMap = {
  "01_avatar": 61696,
  "01_boy": 61697,
  "01_bus": 61698,
  "01_cake": 61699,
  "01_chef_hat": 61700,
  "01_cursor": 61701,
  "01_cutlery": 61702,
  "01_egg": 61703,
  "01_falling_star": 61704,
  "01_firework": 61705,
  "01_flag": 61706,
  "01_flower": 61707,
  "01_heart": 61708,
  "01_home": 61709,
  "01_horizontal_bar": 61710,
  "01_island": 61711,
  "01_ring": 61712,
  "01_scroll": 61713,
  "01_snowflake": 61714,
  "01_soccer_ball": 61715,
  "01_sun": 61716,
  "01_tablet": 61717,
  "01_trefoil": 61718,
  "01_turkey": 61719,
  "01_user": 61720,
  "01_warmup": 61721,
  "01_world": 61722,
  "01_zombie_hand": 61723,
  "02_apron": 61724,
  "02_atlantic": 61725,
  "02_balloon": 61726,
  "02_basketball": 61727,
  "02_bible": 61728,
  "02_boy": 61729,
  "02_clipboard": 61730,
  "02_cloche": 61731,
  "02_cloudy": 61732,
  "02_compass": 61733,
  "02_cursor": 61734,
  "02_girl": 61735,
  "02_global": 61736,
  "02_heart": 61737,
  "02_historian": 61738,
  "02_horizontal_bar": 61739,
  "02_horseshoe": 61740,
  "02_indian": 61741,
  "02_interweaving": 61742,
  "02_phone": 61743,
  "02_pumpkin_smile": 61744,
  "02_santa_claus": 61745,
  "02_shine": 61746,
  "02_snowfall": 61747,
  "02_train": 61748,
  "02_woman": 61749,
  "02_workout": 61750,
  "03_american": 61751,
  "03_americas": 61752,
  "03_businessman": 61753,
  "03_cards": 61754,
  "03_chef": 61755,
  "03_christmas_tree": 61756,
  "03_clover": 61757,
  "03_clown": 61758,
  "03_crown": 61759,
  "03_egg": 61760,
  "03_firework": 61761,
  "03_ghost": 61762,
  "03_girl": 61763,
  "03_hat": 61764,
  "03_horizontal_bar": 61765,
  "03_hotel": 61766,
  "03_idea": 61767,
  "03_rain": 61768,
  "03_reversal": 61769,
  "03_rings": 61770,
  "03_schoolbus": 61771,
  "03_scroll": 61772,
  "03_search": 61773,
  "03_snowflake2": 61774,
  "03_squat": 61775,
  "03_tableware": 61776,
  "03_tv": 61777,
  "03_web_message": 61778,
  "04_africa": 61779,
  "04_american_woman": 61780,
  "04_balloons": 61781,
  "04_book": 61782,
  "04_broken": 61783,
  "04_chess": 61784,
  "04_cloud": 61785,
  "04_cold": 61786,
  "04_cursor": 61787,
  "04_glass_w": 61788,
  "04_hat": 61789,
  "04_headstone": 61790,
  "04_hearts": 61791,
  "04_hook": 61792,
  "04_horizontal_bar": 61793,
  "04_laugh": 61794,
  "04_message": 61795,
  "04_monitor": 61796,
  "04_passport": 61797,
  "04_rabbit": 61798,
  "04_rainbow": 61799,
  "04_snow_man": 61800,
  "04_storm": 61801,
  "04_stove": 61802,
  "04_teacher_w": 61803,
  "04_v_sit": 61804,
  "04_van": 61805,
  "04_waitress": 61806,
  "04_whistle": 61807,
  "04_wind": 61808,
  "05_cat": 61809,
  "05_clown": 61810,
  "05_cuple": 61811,
  "05_diagram": 61812,
  "05_egg": 61813,
  "05_emblem": 61814,
  "05_europe": 61815,
  "05_flapper": 61816,
  "05_glass_m": 61817,
  "05_hat": 61818,
  "05_horizontal_bar": 61819,
  "05_leaf": 61820,
  "05_link": 61821,
  "05_loop": 61822,
  "05_mixer": 61823,
  "05_pc": 61824,
  "05_quatrefoil": 61825,
  "05_rainbow": 61826,
  "05_ring": 61827,
  "05_shuttlecok": 61828,
  "05_sight": 61829,
  "05_snowflake": 61830,
  "05_snowflake3": 61831,
  "05_straight_bridge": 61832,
  "05_teacher_m": 61833,
  "05_thermometer": 61834,
  "05_tripod": 61835,
  "05_trolleybus": 61836,
  "05_user": 61837,
  "05_waiter": 61838,
  "05_witch_hat": 61839,
  "06_angel": 61840,
  "06_arrow": 61841,
  "06_asia": 61842,
  "06_balloons": 61843,
  "06_bridge": 61844,
  "06_calculator": 61845,
  "06_cold_wind": 61846,
  "06_column": 61847,
  "06_contacts": 61848,
  "06_deer": 61849,
  "06_hockey": 61850,
  "06_horizontal_bar": 61851,
  "06_leaf_fall": 61852,
  "06_liar": 61853,
  "06_map_pointer": 61854,
  "06_notebook": 61855,
  "06_pulse": 61856,
  "06_pumpkin": 61857,
  "06_quatrefoil": 61858,
  "06_scale": 61859,
  "06_shoe": 61860,
  "06_shop": 61861,
  "06_skull": 61862,
  "06_star": 61863,
  "06_thermometer": 61864,
  "06_truck": 61865,
  "06_waiter": 61866,
  "06_whistle": 61867,
  "06_woman": 61868,
  "06_woman2": 61869,
  "07_alien": 61870,
  "07_apple": 61871,
  "07_australia": 61872,
  "07_blackboard": 61873,
  "07_boo": 61874,
  "07_chef": 61875,
  "07_christmas_star": 61876,
  "07_dress": 61877,
  "07_duck_toy": 61878,
  "07_egg": 61879,
  "07_evil": 61880,
  "07_globe": 61881,
  "07_hand": 61882,
  "07_hat": 61883,
  "07_horizontal_bar": 61884,
  "07_leaf_tree": 61885,
  "07_notebook": 61886,
  "07_phone": 61887,
  "07_salt_pepper": 61888,
  "07_signpost": 61889,
  "07_snowflake4": 61890,
  "07_sparklers": 61891,
  "07_spiral": 61892,
  "07_support_w": 61893,
  "07_tram": 61894,
  "07_trefoil": 61895,
  "07_tv": 61896,
  "07_walk": 61897,
  "07_wind": 61898,
  "08_ancient_pottery": 61899,
  "08_angel": 61900,
  "08_antarctica": 61901,
  "08_balloons": 61902,
  "08_briefcase": 61903,
  "08_candles": 61904,
  "08_clubs": 61905,
  "08_flag": 61906,
  "08_flower": 61907,
  "08_flower2": 61908,
  "08_fridge": 61909,
  "08_fruit_tree": 61910,
  "08_glass_snowball": 61911,
  "08_globe": 61912,
  "08_gravitation": 61913,
  "08_hat": 61914,
  "08_horizontal_bar": 61915,
  "08_leaf": 61916,
  "08_pig": 61917,
  "08_pool": 61918,
  "08_pumpkin_evil": 61919,
  "08_running": 61920,
  "08_search": 61921,
  "08_sparkle": 61922,
  "08_subway": 61923,
  "08_support_m": 61924,
  "08_terminal": 61925,
  "08_tuxedo": 61926,
  "08_whistle": 61927,
  "09_cake": 61928,
  "09_camera": 61929,
  "09_car": 61930,
  "09_cat": 61931,
  "09_christmas_tree": 61932,
  "09_cross": 61933,
  "09_curve": 61934,
  "09_edit": 61935,
  "09_farmer": 61936,
  "09_gamepad": 61937,
  "09_haha": 61938,
  "09_hat": 61939,
  "09_home": 61940,
  "09_kettlebell_swing": 61941,
  "09_lock": 61942,
  "09_map": 61943,
  "09_maple_leaf": 61944,
  "09_one": 61945,
  "09_pie": 61946,
  "09_r": 61947,
  "09_santa": 61948,
  "09_scroll": 61949,
  "09_search": 61950,
  "09_search_money": 61951,
  "09_smile": 61952,
  "09_spoon_fork": 61953,
  "09_sprout": 61954,
  "09_tshirt": 61955,
  "09_world": 61956,
  "10_air": 61957,
  "10_annals": 61958,
  "10_april": 61959,
  "10_beach_umbrella": 61960,
  "10_builder": 61961,
  "10_capitol": 61962,
  "10_champagne": 61963,
  "10_cool": 61964,
  "10_cross": 61965,
  "10_egg": 61966,
  "10_electric_car": 61967,
  "10_financier": 61968,
  "10_gamepad2": 61969,
  "10_glass": 61970,
  "10_kettlebell_swing": 61971,
  "10_leaf": 61972,
  "10_options": 61973,
  "10_owl": 61974,
  "10_pie": 61975,
  "10_restaurant": 61976,
  "10_ring_binder": 61977,
  "10_saucepan": 61978,
  "10_snowman": 61979,
  "10_twister": 61980,
  "10_two": 61981,
  "10_umbrella": 61982,
  "10_video_camera": 61983,
  "10_watering_can": 61984,
  "10_wifi": 61985,
  "10_winter_house": 61986,
  "11_air_horn": 61987,
  "11_basket": 61988,
  "11_bell": 61989,
  "11_capitol": 61990,
  "11_chestnut_leaf": 61991,
  "11_document": 61992,
  "11_economic_idea": 61993,
  "11_favorites": 61994,
  "11_fossil": 61995,
  "11_glasses": 61996,
  "11_gravitation2": 61997,
  "11_heal": 61998,
  "11_planche": 61999,
  "11_pot_plant": 62000,
  "11_restaurant": 62001,
  "11_sad": 62002,
  "11_scoop": 62003,
  "11_settings": 62004,
  "11_shipping": 62005,
  "11_sock": 62006,
  "11_speaker": 62007,
  "11_spider": 62008,
  "11_sunglasses": 62009,
  "11_taxi": 62010,
  "11_three": 62011,
  "11_tshirt": 62012,
  "11_turkey": 62013,
  "11_vr": 62014,
  "11_winter_house": 62015,
  "12_auto": 62016,
  "12_champagne": 62017,
  "12_christmas_wreath": 62018,
  "12_crow": 62019,
  "12_document": 62020,
  "12_five": 62021,
  "12_hat": 62022,
  "12_in_ear": 62023,
  "12_leprechaun": 62024,
  "12_motorcycle": 62025,
  "12_mouse": 62026,
  "12_mustache": 62027,
  "12_oak_leaf": 62028,
  "12_pan": 62029,
  "12_prehistory": 62030,
  "12_pushup": 62031,
  "12_qr": 62032,
  "12_referee": 62033,
  "12_restaurant": 62034,
  "12_rose": 62035,
  "12_santa_claus": 62036,
  "12_scare": 62037,
  "12_seed": 62038,
  "12_spiral2": 62039,
  "12_sticker": 62040,
  "12_table": 62041,
  "12_url": 62042,
  "12_white_house": 62043,
  "12_whoopie": 62044,
  "12_wine": 62045,
  "13_bbq": 62046,
  "13_bite": 62047,
  "13_cave_paintings": 62048,
  "13_chick": 62049,
  "13_christmas_sock": 62050,
  "13_cocktail": 62051,
  "13_crawl": 62052,
  "13_doctor": 62053,
  "13_falling_star": 62054,
  "13_flip_flops": 62055,
  "13_folder": 62056,
  "13_gift": 62057,
  "13_grin": 62058,
  "13_headphone": 62059,
  "13_headset": 62060,
  "13_knife": 62061,
  "13_laugh": 62062,
  "13_leaf2": 62063,
  "13_liberty": 62064,
  "13_list": 62065,
  "13_lol": 62066,
  "13_options": 62067,
  "13_police": 62068,
  "13_restaurant5": 62069,
  "13_satellite": 62070,
  "13_server": 62071,
  "13_shales": 62072,
  "13_ten": 62073,
  "13_treasure": 62074,
  "13_wheelbarrow": 62075,
  "13_zigzag": 62076,
  "14_ambulance": 62077,
  "14_beer": 62078,
  "14_bikini": 62079,
  "14_boom": 62080,
  "14_bridge": 62081,
  "14_coin": 62082,
  "14_database": 62083,
  "14_diagram": 62084,
  "14_diamond_loop": 62085,
  "14_downward_dog": 62086,
  "14_egg": 62087,
  "14_ent": 62088,
  "14_fifteen": 62089,
  "14_file": 62090,
  "14_fireplace": 62091,
  "14_holly": 62092,
  "14_hotdog": 62093,
  "14_http": 62094,
  "14_maple_leaf2": 62095,
  "14_microphone": 62096,
  "14_net": 62097,
  "14_restaurant3": 62098,
  "14_round": 62099,
  "14_route": 62100,
  "14_signature": 62101,
  "14_snowdrop": 62102,
  "14_tablet": 62103,
  "14_vial": 62104,
  "14_woman": 62105,
  "15_bat": 62106,
  "15_beer": 62107,
  "15_butterfly": 62108,
  "15_cafe": 62109,
  "15_city": 62110,
  "15_corkscrew": 62111,
  "15_cross": 62112,
  "15_e_reader": 62113,
  "15_firecracker": 62114,
  "15_flower3": 62115,
  "15_gift": 62116,
  "15_graph": 62117,
  "15_hipnosis": 62118,
  "15_hotdog": 62119,
  "15_leaf3": 62120,
  "15_list": 62121,
  "15_phone": 62122,
  "15_plus": 62123,
  "15_quote": 62124,
  "15_registry_office": 62125,
  "15_satellite": 62126,
  "15_ship": 62127,
  "15_snow_covered_trees": 62128,
  "15_surgeon": 62129,
  "15_swimming": 62130,
  "15_swimming_duck": 62131,
  "15_tangle": 62132,
  "15_twenty": 62133,
  "15_upward_dog": 62134,
  "15_window": 62135,
  "15_www": 62136,
  "16_battery": 62137,
  "16_blooming_tree": 62138,
  "16_circumnavigation": 62139,
  "16_cloud": 62140,
  "16_cocktail": 62141,
  "16_cutlery": 62142,
  "16_deck_chair": 62143,
  "16_doctor_support": 62144,
  "16_dove": 62145,
  "16_egg": 62146,
  "16_empire_state": 62147,
  "16_fifty": 62148,
  "16_flexibility": 62149,
  "16_harvester": 62150,
  "16_kek": 62151,
  "16_minus": 62152,
  "16_mp3_player": 62153,
  "16_museum": 62154,
  "16_porridge": 62155,
  "16_pub": 62156,
  "16_recliner": 62157,
  "16_rowan_leaf": 62158,
  "16_santa_claus2": 62159,
  "16_shamrock": 62160,
  "16_snowflake2": 62161,
  "16_statistics": 62162,
  "16_success": 62163,
  "16_tornado": 62164,
  "16_trash": 62165,
  "16_tv": 62166,
  "16_voodoo": 62167,
  "17_airplane": 62168,
  "17_apple": 62169,
  "17_beer": 62170,
  "17_bell": 62171,
  "17_birthday_boy": 62172,
  "17_bread": 62173,
  "17_cam": 62174,
  "17_cartography": 62175,
  "17_check": 62176,
  "17_chocolate": 62177,
  "17_diablo": 62178,
  "17_dollar": 62179,
  "17_egg": 62180,
  "17_farmer": 62181,
  "17_game_console": 62182,
  "17_game_station": 62183,
  "17_gps": 62184,
  "17_groucho_glasses": 62185,
  "17_past": 62186,
  "17_pie_chart": 62187,
  "17_santa_hat": 62188,
  "17_shamrock": 62189,
  "17_spiral": 62190,
  "17_table": 62191,
  "17_tablet": 62192,
  "17_toe_touches": 62193,
  "17_usa": 62194,
  "17_woman3": 62195,
  "18_beer": 62196,
  "18_builder": 62197,
  "18_cake": 62198,
  "18_case": 62199,
  "18_crab": 62200,
  "18_croissant": 62201,
  "18_deer": 62202,
  "18_euro": 62203,
  "18_fireplace": 62204,
  "18_frank": 62205,
  "18_game_box": 62206,
  "18_game_console": 62207,
  "18_grass": 62208,
  "18_hourglass": 62209,
  "18_jet": 62210,
  "18_laugh": 62211,
  "18_music": 62212,
  "18_party": 62213,
  "18_pear": 62214,
  "18_phone": 62215,
  "18_pie_chart": 62216,
  "18_restart": 62217,
  "18_right": 62218,
  "18_smile": 62219,
  "18_strawberry": 62220,
  "18_table": 62221,
  "18_treasure_map": 62222,
  "18_tulip": 62223,
  "18_usa_emblem": 62224,
  "18_wheat": 62225,
  "18_woman": 62226,
  "19_archeology": 62227,
  "19_avatar": 62228,
  "19_banana": 62229,
  "19_beer": 62230,
  "19_car_trip": 62231,
  "19_cool": 62232,
  "19_dead": 62233,
  "19_dj": 62234,
  "19_eagle_emblem": 62235,
  "19_egg": 62236,
  "19_flower4": 62237,
  "19_friends": 62238,
  "19_handheld_console": 62239,
  "19_handstand": 62240,
  "19_horn": 62241,
  "19_laptop": 62242,
  "19_left": 62243,
  "19_loop2": 62244,
  "19_pie_chart": 62245,
  "19_plum": 62246,
  "19_portable": 62247,
  "19_road_map": 62248,
  "19_romantic_dinner": 62249,
  "19_rose": 62250,
  "19_snow_ball": 62251,
  "19_stick_candy": 62252,
  "19_suitcase": 62253,
  "19_tshirt": 62254,
  "19_vampire": 62255,
  "19_wafer": 62256,
  "19_yen": 62257,
  "20_balloons": 62258,
  "20_beer": 62259,
  "20_birthday": 62260,
  "20_cake": 62261,
  "20_cherry": 62262,
  "20_cherry_pie": 62263,
  "20_close": 62264,
  "20_corn": 62265,
  "20_cross": 62266,
  "20_gift": 62267,
  "20_grapes": 62268,
  "20_grim_reaper": 62269,
  "20_handheld_console": 62270,
  "20_leaf": 62271,
  "20_map": 62272,
  "20_music": 62273,
  "20_open": 62274,
  "20_penguin": 62275,
  "20_phone": 62276,
  "20_pie_chart": 62277,
  "20_play": 62278,
  "20_pound": 62279,
  "20_referee": 62280,
  "20_retro_portable": 62281,
  "20_sad": 62282,
  "20_scary": 62283,
  "20_side_ship": 62284,
  "20_skull": 62285,
  "20_sled": 62286,
  "20_star_emblem": 62287,
  "20_technique": 62288,
  "21_24": 62289,
  "21_bag": 62290,
  "21_bottle": 62291,
  "21_cake": 62292,
  "21_christmas_wreath": 62293,
  "21_corn": 62294,
  "21_doctor": 62295,
  "21_drum": 62296,
  "21_dyeing": 62297,
  "21_flapper": 62298,
  "21_flower5": 62299,
  "21_fresco": 62300,
  "21_garland": 62301,
  "21_gps": 62302,
  "21_group": 62303,
  "21_hanging_leg_raise": 62304,
  "21_horn": 62305,
  "21_jam": 62306,
  "21_key": 62307,
  "21_map_search": 62308,
  "21_mask": 62309,
  "21_next": 62310,
  "21_pie_chart": 62311,
  "21_poof": 62312,
  "21_refresh": 62313,
  "21_retro_gamepad": 62314,
  "21_ruble": 62315,
  "21_scare": 62316,
  "21_vr": 62317,
  "21_yacht": 62318,
  "22_barn": 62319,
  "22_battle": 62320,
  "22_bunny": 62321,
  "22_can": 62322,
  "22_candle": 62323,
  "22_cent": 62324,
  "22_christmas_ball": 62325,
  "22_clown": 62326,
  "22_finger": 62327,
  "22_firework": 62328,
  "22_flag": 62329,
  "22_game": 62330,
  "22_laugh": 62331,
  "22_lying_leg_raise": 62332,
  "22_map_pointer": 62333,
  "22_muffin": 62334,
  "22_onion": 62335,
  "22_people": 62336,
  "22_pie_chart": 62337,
  "22_portable2": 62338,
  "22_previous": 62339,
  "22_ring": 62340,
  "22_salad": 62341,
  "22_sparklers": 62342,
  "22_steering_wheel": 62343,
  "22_surgeon": 62344,
  "22_takeaway": 62345,
  "22_undo": 62346,
  "22_water_scooter": 62347,
  "22_watermelon": 62348,
  "22_wink": 62349,
  "23_angry_ghost": 62350,
  "23_apples": 62351,
  "23_ball": 62352,
  "23_bouquet": 62353,
  "23_bow": 62354,
  "23_bust": 62355,
  "23_christmas_angel": 62356,
  "23_cocktail": 62357,
  "23_crack": 62358,
  "23_down": 62359,
  "23_driver": 62360,
  "23_game_controller": 62361,
  "23_handlebar": 62362,
  "23_hindu": 62363,
  "23_leek": 62364,
  "23_menu": 62365,
  "23_money": 62366,
  "23_orange_cut": 62367,
  "23_pendant": 62368,
  "23_photo": 62369,
  "23_pie_chart": 62370,
  "23_piece_cake": 62371,
  "23_pomegranate": 62372,
  "23_potato": 62373,
  "23_redo": 62374,
  "23_road_map": 62375,
  "23_settings": 62376,
  "23_side_ambulance": 62377,
  "23_skull": 62378,
  "23_star": 62379,
  "23_straddle_split": 62380,
  "23_victory": 62381,
  "24_astronaut": 62382,
  "24_bag": 62383,
  "24_balloon": 62384,
  "24_barbell": 62385,
  "24_basil": 62386,
  "24_basket": 62387,
  "24_camera": 62388,
  "24_christmas_star": 62389,
  "24_citrus": 62390,
  "24_cognac": 62391,
  "24_decor": 62392,
  "24_donut": 62393,
  "24_dvd": 62394,
  "24_evil_ghost": 62395,
  "24_exchange": 62396,
  "24_flag": 62397,
  "24_game_controller": 62398,
  "24_gifts": 62399,
  "24_jester": 62400,
  "24_juicer": 62401,
  "24_karaoke": 62402,
  "24_map_search": 62403,
  "24_mouse": 62404,
  "24_pie_chart": 62405,
  "24_play": 62406,
  "24_portrait": 62407,
  "24_pumpkin": 62408,
  "24_reindeer_horns": 62409,
  "24_side_van": 62410,
  "24_tulip": 62411,
  "24_up": 62412,
  "24_yashmak": 62413,
  "25_apple_cut": 62414,
  "25_bone_cross": 62415,
  "25_cart": 62416,
  "25_chilli_pepper": 62417,
  "25_climbing": 62418,
  "25_compass": 62419,
  "25_cutlery": 62420,
  "25_four": 62421,
  "25_gift": 62422,
  "25_globe": 62423,
  "25_glow": 62424,
  "25_heart": 62425,
  "25_juice_jug": 62426,
  "25_leaf_cart": 62427,
  "25_map_pointer": 62428,
  "25_meat": 62429,
  "25_mug": 62430,
  "25_one_candle": 62431,
  "25_poop": 62432,
  "25_priest": 62433,
  "25_right": 62434,
  "25_sled": 62435,
  "25_snowflake3": 62436,
  "25_star": 62437,
  "25_sun_cart": 62438,
  "25_time": 62439,
  "25_tractor": 62440,
  "25_umbrella": 62441,
  "25_usb_flash": 62442,
  "25_venus_willendorf": 62443,
  "25_vertical_bar": 62444,
  "25_wine": 62445,
  "26_4th_july": 62446,
  "26_bbq": 62447,
  "26_boots": 62448,
  "26_bronze_age": 62449,
  "26_cake_piece": 62450,
  "26_calendar": 62451,
  "26_card": 62452,
  "26_church": 62453,
  "26_climbing_wall": 62454,
  "26_clock": 62455,
  "26_coock": 62456,
  "26_eggplant": 62457,
  "26_gift": 62458,
  "26_grill_steak": 62459,
  "26_heart": 62460,
  "26_hypnosis": 62461,
  "26_juice_jug": 62462,
  "26_left": 62463,
  "26_map_pointer": 62464,
  "26_pentagram": 62465,
  "26_reload": 62466,
  "26_side_truck": 62467,
  "26_skates": 62468,
  "26_snowfall": 62469,
  "26_soup": 62470,
  "26_star": 62471,
  "26_vertical_bar": 62472,
  "26_wireless": 62473,
  "27_24": 62474,
  "27_blizzard": 62475,
  "27_broom": 62476,
  "27_car": 62477,
  "27_champagne": 62478,
  "27_eagle": 62479,
  "27_eye": 62480,
  "27_fish_steak": 62481,
  "27_garlic": 62482,
  "27_gps_arrow": 62483,
  "27_greetings": 62484,
  "27_gymnastic_rings": 62485,
  "27_hat": 62486,
  "27_health": 62487,
  "27_honey": 62488,
  "27_hotdog": 62489,
  "27_iron_age": 62490,
  "27_kiss": 62491,
  "27_map_pointer": 62492,
  "27_meat": 62493,
  "27_message": 62494,
  "27_mitten": 62495,
  "27_mouse": 62496,
  "27_percent": 62497,
  "27_phone": 62498,
  "27_sd": 62499,
  "27_side_truck2": 62500,
  "27_sunflower": 62501,
  "27_sunscreen": 62502,
  "27_up2": 62503,
  "27_vertical_bar": 62504,
  "28_bark": 62505,
  "28_bell": 62506,
  "28_bus": 62507,
  "28_calendar": 62508,
  "28_check": 62509,
  "28_chicken": 62510,
  "28_coins": 62511,
  "28_concrete_truck": 62512,
  "28_democratic": 62513,
  "28_down2": 62514,
  "28_emblem": 62515,
  "28_food": 62516,
  "28_glasses": 62517,
  "28_global": 62518,
  "28_gps": 62519,
  "28_like": 62520,
  "28_mobility": 62521,
  "28_money": 62522,
  "28_moon": 62523,
  "28_mug": 62524,
  "28_pool": 62525,
  "28_potato": 62526,
  "28_santa_hat": 62527,
  "28_sdmini": 62528,
  "28_store": 62529,
  "28_sunglasses": 62530,
  "28_tv": 62531,
  "28_vegetables": 62532,
  "28_vertical_bar": 62533,
  "28_watermelon": 62534,
  "29_backpack": 62535,
  "29_bacon": 62536,
  "29_battery": 62537,
  "29_beer": 62538,
  "29_cart": 62539,
  "29_christmas_sock": 62540,
  "29_coach": 62541,
  "29_cockroach": 62542,
  "29_dessert": 62543,
  "29_diagonally": 62544,
  "29_folder": 62545,
  "29_grapes": 62546,
  "29_grave": 62547,
  "29_lemon": 62548,
  "29_map_pointer": 62549,
  "29_megalith": 62550,
  "29_mic": 62551,
  "29_one_emblem": 62552,
  "29_pipe": 62553,
  "29_republican": 62554,
  "29_sdmicro": 62555,
  "29_search": 62556,
  "29_skates": 62557,
  "29_snowdrop": 62558,
  "29_strowberry": 62559,
  "29_ticket": 62560,
  "29_tipper": 62561,
  "29_vertical_bar": 62562,
  "29_video": 62563,
  "29_yoga": 62564,
  "30_arc": 62565,
  "30_barrel": 62566,
  "30_bike": 62567,
  "30_boomerang": 62568,
  "30_box": 62569,
  "30_candle": 62570,
  "30_card": 62571,
  "30_cupid": 62572,
  "30_declaration": 62573,
  "30_disk_drive": 62574,
  "30_down_jacket": 62575,
  "30_evacuator": 62576,
  "30_five_emblem": 62577,
  "30_form": 62578,
  "30_fullscreen": 62579,
  "30_gift": 62580,
  "30_glove": 62581,
  "30_idea": 62582,
  "30_lunge": 62583,
  "30_message": 62584,
  "30_navigation": 62585,
  "30_phone": 62586,
  "30_pizza": 62587,
  "30_restart": 62588,
  "30_sausage": 62589,
  "30_sunflower": 62590,
  "30_time": 62591,
  "30_vertical_bar": 62592,
  "30_willow": 62593,
  "30_wine": 62594,
  "31_acorn": 62595,
  "31_all_directions": 62596,
  "31_avatar": 62597,
  "31_bag": 62598,
  "31_bell": 62599,
  "31_cocktail": 62600,
  "31_cursor": 62601,
  "31_death": 62602,
  "31_disc": 62603,
  "31_excavator": 62604,
  "31_fish": 62605,
  "31_flower": 62606,
  "31_hop": 62607,
  "31_human_flag": 62608,
  "31_laurel_wreath": 62609,
  "31_map": 62610,
  "31_map_pins": 62611,
  "31_mic": 62612,
  "31_money": 62613,
  "31_picture": 62614,
  "31_potion": 62615,
  "31_sleigh": 62616,
  "31_support": 62617,
  "31_sushi": 62618,
  "31_ten_emblem": 62619,
  "31_tshirt": 62620,
  "31_tv": 62621,
  "31_vertical_bar": 62622,
  "32_auto": 62623,
  "32_candle": 62624,
  "32_cannon": 62625,
  "32_chinese": 62626,
  "32_compass_rose": 62627,
  "32_diagram": 62628,
  "32_email": 62629,
  "32_exchange": 62630,
  "32_floppy_disk": 62631,
  "32_fly": 62632,
  "32_food": 62633,
  "32_global": 62634,
  "32_glove": 62635,
  "32_indigenous": 62636,
  "32_knife": 62637,
  "32_list": 62638,
  "32_mail": 62639,
  "32_mug": 62640,
  "32_mushroom": 62641,
  "32_photo": 62642,
  "32_pullup": 62643,
  "32_round_trip": 62644,
  "32_sale": 62645,
  "32_shrimp": 62646,
  "32_support": 62647,
  "32_team": 62648,
  "32_tent": 62649,
  "32_twenty_five": 62650,
  "32_vertical_bar": 62651,
  "32_wheat": 62652,
  "33_bbq": 62653,
  "33_bow": 62654,
  "33_calendar": 62655,
  "33_cart": 62656,
  "33_coffee": 62657,
  "33_data_structure": 62658,
  "33_fatigue": 62659,
  "33_globe": 62660,
  "33_hamburger": 62661,
  "33_hbd": 62662,
  "33_in_cart": 62663,
  "33_key": 62664,
  "33_man": 62665,
  "33_mayan_script": 62666,
  "33_mouse": 62667,
  "33_office_building": 62668,
  "33_pub": 62669,
  "33_refresh": 62670,
  "33_spooky_gift": 62671,
  "33_spring_shopping": 62672,
  "33_sword": 62673,
  "33_team": 62674,
  "33_thank_you": 62675,
  "33_two": 62676,
  "33_umbrella": 62677,
  "33_wifi": 62678,
  "33_winter_cart": 62679,
  "34_boots": 62680,
  "34_bottle": 62681,
  "34_browser": 62682,
  "34_calendar": 62683,
  "34_chip_key": 62684,
  "34_communication": 62685,
  "34_edit": 62686,
  "34_emblem": 62687,
  "34_four_directions": 62688,
  "34_fries": 62689,
  "34_graph": 62690,
  "34_hotdog": 62691,
  "34_in_file": 62692,
  "34_keyboard": 62693,
  "34_map_pointer": 62694,
  "34_pain": 62695,
  "34_pistol": 62696,
  "34_tablet": 62697,
  "34_three": 62698,
  "34_tikal_temple": 62699,
  "34_wand": 62700,
  "34_water": 62701,
  "34_woman": 62702,
  "35_aim": 62703,
  "35_ancient_egypt": 62704,
  "35_blackboard": 62705,
  "35_card": 62706,
  "35_clowd": 62707,
  "35_cocktail": 62708,
  "35_coconut": 62709,
  "35_couple": 62710,
  "35_dialog": 62711,
  "35_emblem": 62712,
  "35_flag": 62713,
  "35_graphic_tablet": 62714,
  "35_growth_chart": 62715,
  "35_out_file": 62716,
  "35_phone": 62717,
  "35_pizza": 62718,
  "35_power": 62719,
  "35_remote": 62720,
  "35_sleep": 62721,
  "35_star": 62722,
  "35_suit": 62723,
  "35_tacos": 62724,
  "35_tv": 62725,
  "35_watering_can": 62726,
  "36_arrow_gps": 62727,
  "36_be_irish": 62728,
  "36_calendar": 62729,
  "36_chat": 62730,
  "36_cocktail": 62731,
  "36_colosseum": 62732,
  "36_corn": 62733,
  "36_couple": 62734,
  "36_flag_map_pin": 62735,
  "36_gps": 62736,
  "36_graph_fall": 62737,
  "36_in_phone": 62738,
  "36_letter": 62739,
  "36_mail": 62740,
  "36_medal": 62741,
  "36_message": 62742,
  "36_mind": 62743,
  "36_partner": 62744,
  "36_phone": 62745,
  "36_recovery": 62746,
  "36_search": 62747,
  "36_spooky_tv": 62748,
  "36_sushi": 62749,
  "36_tv": 62750,
  "36_webcam": 62751,
  "36_wheelbarrow": 62752,
  "37_bbq": 62753,
  "37_beer": 62754,
  "37_card": 62755,
  "37_chinese": 62756,
  "37_digital_photo_frame": 62757,
  "37_fingerprint": 62758,
  "37_food": 62759,
  "37_guests": 62760,
  "37_in_folder": 62761,
  "37_letter": 62762,
  "37_magnifier": 62763,
  "37_message": 62764,
  "37_parthenon": 62765,
  "37_peak": 62766,
  "37_phone": 62767,
  "37_retail": 62768,
  "37_round_clock": 62769,
  "37_search": 62770,
  "37_sex": 62771,
  "37_shoe": 62772,
  "37_tractor": 62773,
  "37_trophy": 62774,
  "37_wine": 62775,
  "37_zen": 62776,
  "38_ban": 62777,
  "38_beer": 62778,
  "38_card": 62779,
  "38_centurion": 62780,
  "38_fallin": 62781,
  "38_gift": 62782,
  "38_gift_cart": 62783,
  "38_gopro": 62784,
  "38_harvester": 62785,
  "38_intersection": 62786,
  "38_map": 62787,
  "38_martini": 62788,
  "38_message": 62789,
  "38_message_play": 62790,
  "38_out_folder": 62791,
  "38_people": 62792,
  "38_pointer": 62793,
  "38_primal": 62794,
  "38_sextant": 62795,
  "38_shawarma": 62796,
  "38_shield": 62797,
  "38_suitcase": 62798,
  "38_tablet": 62799,
  "38_waiter": 62800,
  "38_water": 62801,
  "38_whiskey": 62802,
  "38_zombie_cursor": 62803,
  "39_air_travel": 62804,
  "39_angkor_wat": 62805,
  "39_bag": 62806,
  "39_cart": 62807,
  "39_chrysanthemum": 62808,
  "39_cocktail": 62809,
  "39_cognac": 62810,
  "39_coins": 62811,
  "39_communication": 62812,
  "39_death": 62813,
  "39_emblem": 62814,
  "39_from_cloud": 62815,
  "39_fruit": 62816,
  "39_gift": 62817,
  "39_gps_navigation": 62818,
  "39_graph": 62819,
  "39_icecream": 62820,
  "39_mail": 62821,
  "39_options": 62822,
  "39_parkour": 62823,
  "39_satellite_imagery": 62824,
  "39_soda": 62825,
  "39_steward": 62826,
  "39_swimming": 62827,
  "39_tacos": 62828,
  "39_team": 62829,
  "39_wheat": 62830,
  "39_winter_bag": 62831,
  "40_backflip": 62832,
  "40_bag": 62833,
  "40_beer": 62834,
  "40_card": 62835,
  "40_chart": 62836,
  "40_chef": 62837,
  "40_delivery": 62838,
  "40_drink": 62839,
  "40_flag": 62840,
  "40_folder": 62841,
  "40_heart": 62842,
  "40_hotdog": 62843,
  "40_icecream_cone": 62844,
  "40_in_cloud": 62845,
  "40_postcard": 62846,
  "40_potion": 62847,
  "40_pumpkin_head": 62848,
  "40_qr": 62849,
  "40_reload": 62850,
  "40_repair": 62851,
  "40_round": 62852,
  "40_saint": 62853,
  "40_search": 62854,
  "40_spooky_book": 62855,
  "40_sunflower": 62856,
  "40_support": 62857,
  "40_tracker": 62858,
  "40_wafer": 62859,
  "40_yellow_crane_tower": 62860,
  "41_airplane": 62861,
  "41_bbq": 62862,
  "41_bitten_message": 62863,
  "41_calendar": 62864,
  "41_candy": 62865,
  "41_cat": 62866,
  "41_driver": 62867,
  "41_easter_egg": 62868,
  "41_empire_state": 62869,
  "41_firework": 62870,
  "41_fortress": 62871,
  "41_holly": 62872,
  "41_honey": 62873,
  "41_in_box": 62874,
  "41_map_pointer": 62875,
  "41_notebook": 62876,
  "41_one": 62877,
  "41_options": 62878,
  "41_plain": 62879,
  "41_priest": 62880,
  "41_printer": 62881,
  "41_skull": 62882,
  "41_star": 62883,
  "41_strength": 62884,
  "41_swim_mask": 62885,
  "41_thanksgiving": 62886,
  "41_user": 62887,
  "42_apple": 62888,
  "42_bike": 62889,
  "42_bottle": 62890,
  "42_bunny": 62891,
  "42_bus": 62892,
  "42_card": 62893,
  "42_chest": 62894,
  "42_christian": 62895,
  "42_dog": 62896,
  "42_egg": 62897,
  "42_fav": 62898,
  "42_firework": 62899,
  "42_glass": 62900,
  "42_global_web": 62901,
  "42_liquid": 62902,
  "42_message": 62903,
  "42_mountain": 62904,
  "42_one": 62905,
  "42_out_box": 62906,
  "42_petard": 62907,
  "42_phone": 62908,
  "42_pilot": 62909,
  "42_renaissance": 62910,
  "42_sparkler": 62911,
  "42_stability-ball": 62912,
  "42_tablet": 62913,
  "42_two": 62914,
  "42_watch": 62915,
  "43_accumulator": 62916,
  "43_biker": 62917,
  "43_car_trip": 62918,
  "43_church": 62919,
  "43_coffee": 62920,
  "43_desert": 62921,
  "43_dumbbell": 62922,
  "43_easter_egg2": 62923,
  "43_fish": 62924,
  "43_flower": 62925,
  "43_folder": 62926,
  "43_in": 62927,
  "43_like": 62928,
  "43_liquid_message": 62929,
  "43_message1": 62930,
  "43_minus": 62931,
  "43_phone": 62932,
  "43_prayer": 62933,
  "43_pumpkin": 62934,
  "43_santa": 62935,
  "43_slapstick": 62936,
  "43_sparklers": 62937,
  "43_tablet": 62938,
  "43_three": 62939,
  "43_train": 62940,
  "43_vegetable_box": 62941,
  "43_zombie": 62942,
  "44_apple_box": 62943,
  "44_car": 62944,
  "44_card": 62945,
  "44_cheese": 62946,
  "44_cocktail": 62947,
  "44_electric_charging": 62948,
  "44_faith": 62949,
  "44_financial_news": 62950,
  "44_five": 62951,
  "44_flapper": 62952,
  "44_frank": 62953,
  "44_heart": 62954,
  "44_heart_gift": 62955,
  "44_horn": 62956,
  "44_lights": 62957,
  "44_modern_building": 62958,
  "44_out": 62959,
  "44_parallettes": 62960,
  "44_plus": 62961,
  "44_pointer": 62962,
  "44_recharger": 62963,
  "44_river": 62964,
  "44_sandglass": 62965,
  "44_tongue": 62966,
  "44_tv": 62967,
  "44_vampire": 62968,
  "44_view": 62969,
  "44_yacht": 62970,
  "45_adapter": 62971,
  "45_bag": 62972,
  "45_beard": 62973,
  "45_beer": 62974,
  "45_check": 62975,
  "45_firework": 62976,
  "45_folder": 62977,
  "45_gas_station": 62978,
  "45_grim_reaper": 62979,
  "45_horns": 62980,
  "45_idea": 62981,
  "45_kettlebell": 62982,
  "45_lake": 62983,
  "45_last": 62984,
  "45_lollipop": 62985,
  "45_message": 62986,
  "45_pen": 62987,
  "45_petard": 62988,
  "45_pointer": 62989,
  "45_ring": 62990,
  "45_rocket": 62991,
  "45_salad": 62992,
  "45_ship": 62993,
  "45_spring": 62994,
  "45_tap": 62995,
  "45_ten": 62996,
  "45_war": 62997,
  "45_wine_list": 62998,
  "45_yacht": 62999,
  "46_ban": 63000,
  "46_bbq": 63001,
  "46_bitten_phone": 63002,
  "46_candle": 63003,
  "46_cup": 63004,
  "46_diablo": 63005,
  "46_fifteen": 63006,
  "46_first": 63007,
  "46_gift": 63008,
  "46_gymnastic_rings": 63009,
  "46_island": 63010,
  "46_lights": 63011,
  "46_mail": 63012,
  "46_menu": 63013,
  "46_motorbike": 63014,
  "46_mushroom": 63015,
  "46_options": 63016,
  "46_revolution": 63017,
  "46_rss": 63018,
  "46_sea": 63019,
  "46_search": 63020,
  "46_ship": 63021,
  "46_skeleton": 63022,
  "46_snowflake4": 63023,
  "46_turkey": 63024,
  "46_window": 63025,
  "46_wireless_access_point": 63026,
  "47_autorestart": 63027,
  "47_bike": 63028,
  "47_bowler": 63029,
  "47_cash_register": 63030,
  "47_clipboard": 63031,
  "47_cranberry": 63032,
  "47_drink": 63033,
  "47_folder": 63034,
  "47_garlands": 63035,
  "47_ghost": 63036,
  "47_handset": 63037,
  "47_hazelnut": 63038,
  "47_lable": 63039,
  "47_lifebuoy": 63040,
  "47_list": 63041,
  "47_mask": 63042,
  "47_monarchy": 63043,
  "47_money": 63044,
  "47_movie": 63045,
  "47_mug": 63046,
  "47_scooter": 63047,
  "47_stink": 63048,
  "47_stopwatch": 63049,
  "47_swamp": 63050,
  "47_time": 63051,
  "47_trash": 63052,
  "47_tv": 63053,
  "47_twenty_five": 63054,
  "47_winter_sale": 63055,
  "48_alert": 63056,
  "48_badminton": 63057,
  "48_bicycle": 63058,
  "48_blog": 63059,
  "48_bunting_border_roll": 63060,
  "48_cloud": 63061,
  "48_delivery": 63062,
  "48_discount": 63063,
  "48_discount_coupon": 63064,
  "48_fifty": 63065,
  "48_fooled": 63066,
  "48_forest": 63067,
  "48_hike": 63068,
  "48_horror": 63069,
  "48_hot_mug": 63070,
  "48_letter": 63071,
  "48_lights": 63072,
  "48_mail": 63073,
  "48_mind": 63074,
  "48_office_board": 63075,
  "48_point_of_sale": 63076,
  "48_potion": 63077,
  "48_rotation": 63078,
  "48_soccer": 63079,
  "48_swimming": 63080,
  "48_thank_you": 63081,
  "48_tv": 63082,
  "48_water": 63083,
  "48_wc": 63084,
  "49_backpack": 63085,
  "49_backward": 63086,
  "49_bang": 63087,
  "49_broken_tablet": 63088,
  "49_butterfly": 63089,
  "49_calculator": 63090,
  "49_castle": 63091,
  "49_chestnut": 63092,
  "49_crystal_ball": 63093,
  "49_dollar": 63094,
  "49_email": 63095,
  "49_emblem": 63096,
  "49_friend": 63097,
  "49_global_map_pin": 63098,
  "49_globe": 63099,
  "49_list": 63100,
  "49_lock": 63101,
  "49_man": 63102,
  "49_map_pointer": 63103,
  "49_mug": 63104,
  "49_music": 63105,
  "49_past": 63106,
  "49_phone": 63107,
  "49_piggy_bank": 63108,
  "49_pinata": 63109,
  "49_search": 63110,
  "49_star": 63111,
  "49_sun": 63112,
  "50_attention": 63113,
  "50_bee": 63114,
  "50_book": 63115,
  "50_bow": 63116,
  "50_broken_phone": 63117,
  "50_cards": 63118,
  "50_carrot": 63119,
  "50_cloudy": 63120,
  "50_cookies": 63121,
  "50_donut": 63122,
  "50_effort": 63123,
  "50_folder": 63124,
  "50_friend1": 63125,
  "50_jam_jar": 63126,
  "50_kick_me": 63127,
  "50_love_usa": 63128,
  "50_map_pointer": 63129,
  "50_monitor": 63130,
  "50_music": 63131,
  "50_netspeed": 63132,
  "50_past_time": 63133,
  "50_restaurant": 63134,
  "50_spyglass": 63135,
  "50_strategy": 63136,
  "50_tent": 63137,
  "50_turn_right": 63138,
  "50_waiter": 63139,
  "50_wifi": 63140,
  "50_woman": 63141,
  "51_backward": 63142,
  "51_banana": 63143,
  "51_broken_tv": 63144,
  "51_cake": 63145,
  "51_calendar": 63146,
  "51_castle": 63147,
  "51_citrus": 63148,
  "51_dollar": 63149,
  "51_eggs": 63150,
  "51_firework": 63151,
  "51_fishing": 63152,
  "51_foot": 63153,
  "51_friend_minus": 63154,
  "51_fuel": 63155,
  "51_key": 63156,
  "51_ladybug": 63157,
  "51_man_love": 63158,
  "51_message": 63159,
  "51_mind": 63160,
  "51_monitor": 63161,
  "51_mushroom": 63162,
  "51_question": 63163,
  "51_rain": 63164,
  "51_seven": 63165,
  "51_sport": 63166,
  "51_star": 63167,
  "51_turn_left": 63168,
  "52_abc_board": 63169,
  "52_broken_notebook": 63170,
  "52_career": 63171,
  "52_coffin": 63172,
  "52_coin": 63173,
  "52_compass": 63174,
  "52_crown": 63175,
  "52_dish": 63176,
  "52_dragonfly": 63177,
  "52_flour": 63178,
  "52_forward": 63179,
  "52_friend_plus": 63180,
  "52_heart": 63181,
  "52_left_and_right": 63182,
  "52_mind": 63183,
  "52_mute": 63184,
  "52_one": 63185,
  "52_platformer": 63186,
  "52_romantic_dinner": 63187,
  "52_search": 63188,
  "52_slot": 63189,
  "52_star": 63190,
  "52_tablet": 63191,
  "52_tree": 63192,
  "52_turkey": 63193,
  "52_umbrella": 63194,
  "52_woman_love": 63195,
  "53_book": 63196,
  "53_boot": 63197,
  "53_calendar": 63198,
  "53_couple": 63199,
  "53_cross": 63200,
  "53_dj": 63201,
  "53_finger": 63202,
  "53_flight_simulator": 63203,
  "53_friend_cheked": 63204,
  "53_hen": 63205,
  "53_like": 63206,
  "53_man_cookies": 63207,
  "53_mind": 63208,
  "53_mite": 63209,
  "53_repellent": 63210,
  "53_roulette": 63211,
  "53_school_bag": 63212,
  "53_search": 63213,
  "53_ski_lift": 63214,
  "53_sound": 63215,
  "53_split": 63216,
  "53_table": 63217,
  "53_tablet_repair": 63218,
  "53_terms": 63219,
  "53_ticket": 63220,
  "53_tshirt": 63221,
  "53_tv": 63222,
  "53_videochat": 63223,
  "53_wish": 63224,
  "54_aim": 63225,
  "54_battery": 63226,
  "54_bread": 63227,
  "54_bucks": 63228,
  "54_cableway": 63229,
  "54_candy_stick": 63230,
  "54_cloud": 63231,
  "54_confetti": 63232,
  "54_evil_pumpkin": 63233,
  "54_folder": 63234,
  "54_groucho_glasses": 63235,
  "54_leaf": 63236,
  "54_lock": 63237,
  "54_map": 63238,
  "54_maple_leaf": 63239,
  "54_mask": 63240,
  "54_menu": 63241,
  "54_message": 63242,
  "54_mite": 63243,
  "54_mosquito": 63244,
  "54_mountain": 63245,
  "54_office_board": 63246,
  "54_options": 63247,
  "54_phone_repair": 63248,
  "54_pie": 63249,
  "54_pool": 63250,
  "54_survival": 63251,
  "54_two_ways": 63252,
  "55_app": 63253,
  "55_attention": 63254,
  "55_ban": 63255,
  "55_bird": 63256,
  "55_candle": 63257,
  "55_car_wash": 63258,
  "55_cloud_out": 63259,
  "55_crow": 63260,
  "55_darts": 63261,
  "55_dollar": 63262,
  "55_emblem": 63263,
  "55_fall": 63264,
  "55_fly": 63265,
  "55_fool": 63266,
  "55_garlands": 63267,
  "55_hourglass": 63268,
  "55_icecream": 63269,
  "55_low_battery": 63270,
  "55_mask": 63271,
  "55_medkit": 63272,
  "55_message": 63273,
  "55_no_spooky": 63274,
  "55_race": 63275,
  "55_search": 63276,
  "55_skis": 63277,
  "55_sun": 63278,
  "55_supplements": 63279,
  "55_time": 63280,
  "55_tv_repair": 63281,
  "55_up_and_down": 63282,
  "56_ban": 63283,
  "56_bird": 63284,
  "56_birthday": 63285,
  "56_bowling": 63286,
  "56_cart": 63287,
  "56_celebration": 63288,
  "56_chik": 63289,
  "56_cloud_in": 63290,
  "56_cocktail": 63291,
  "56_cowboy_hat": 63292,
  "56_cursor": 63293,
  "56_faq": 63294,
  "56_fishing": 63295,
  "56_food": 63296,
  "56_hand_pointer": 63297,
  "56_jar": 63298,
  "56_lifebuoy": 63299,
  "56_love": 63300,
  "56_medkit": 63301,
  "56_message": 63302,
  "56_monitor": 63303,
  "56_no_way": 63304,
  "56_notebook_repair": 63305,
  "56_power": 63306,
  "56_pulse": 63307,
  "56_puzzle": 63308,
  "56_rainbow": 63309,
  "56_search": 63310,
  "56_sex": 63311,
  "56_snowboard": 63312,
  "56_tree": 63313
};

const iconSet = createIconSet(glyphMap, 'category-icon-font', './../assets/fonts/category-icon-font.ttf');

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;

