/**
 * Created by yh on 2021/6/17
 */
export const flexboxHtml = '<!DOCTYPE html>\n' +
    '<html lang="en" ng-app="flexboxDemoApp">\n' +
    '\n' +
    '<head>\n' +
    '    <meta charset="utf-8">\n' +
    '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '    <link rel="stylesheet" href="https://i-ts.oss-cn-shenzhen.aliyuncs.com/vendor/flexbox/app.min.css">\n' +
    '    <title>CSS3 Flexbox 试验场</title>\n' +
    '</head>\n' +
    '\n' +
    '<body ng-controller="AppCtrl" id="flexbox-body">\n' +
    '    <md-content class="md-padding">\n' +
    '        <div layout-gt-md="row" layout="column">\n' +
    '            <div flex-gt-md="50" flex="100" class="right-padding">\n' +
    '                <h3>弹性子元素宽度</h3>\n' +
    '                <div layout="row" layout-align="center center" class="code">\n' +
    '                    <div flex="15">width: {{children_width}}%</div>\n' +
    '                    <md-slider flex min="0" max="100" ng-model="children_width" aria-label="width"></md-slider>\n' +
    '                </div>\n' +
    '                <md-divider></md-divider>\n' +
    '                <h3>弹性容器属性 &ndash;<span class="highlight">flex container</span></h3>\n' +
    '                <div>\n' +
    '                    <table class="property">\n' +
    '                        <tr>\n' +
    '                            <th>属性</th>\n' +
    '                            <th>属性说明</th>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>flex-direction</td>\n' +
    '                            <td>设置主轴方向，确定弹性子元素排列方式</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>flex-wrap</td>\n' +
    '                            <td>当弹性子元素超出弹性容器范围时是否换行</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>flex-flow</td>\n' +
    '                            <td>flex-direction和flex-wrap属性的快捷方式，复合属性</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>justify-content</td>\n' +
    '                            <td>主轴上的对齐方式</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>align-items</td>\n' +
    '                            <td>侧轴上的对齐方式</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>align-content</td>\n' +
    '                            <td>侧轴有空白且有多行时，侧轴的对齐方式</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '                <div layout="column" layout-gt-md="row" class="code">\n' +
    '                    <div layout="row">\n' +
    '                        <div flex><strong>flex-direction</strong>\n' +
    '                            <md-radio-group ng-model="parent.flexDirection">\n' +
    '                                <md-radio-button value="row" class="highlight">row</md-radio-button>\n' +
    '                                <md-radio-button value="row-reverse">row-reverse</md-radio-button>\n' +
    '                                <md-radio-button value="column">column</md-radio-button>\n' +
    '                                <md-radio-button value="column-reverse">column-reverse</md-radio-button>\n' +
    '                            </md-radio-group>\n' +
    '                        </div>\n' +
    '                        <div flex><strong>flex-wrap</strong>\n' +
    '                            <md-radio-group ng-model="parent.flexWrap">\n' +
    '                                <md-radio-button value="nowrap" class="highlight">nowrap</md-radio-button>\n' +
    '                                <md-radio-button value="wrap">wrap</md-radio-button>\n' +
    '                                <md-radio-button value="wrap-reverse">wrap-reverse</md-radio-button>\n' +
    '                            </md-radio-group>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div layout="row">\n' +
    '                        <div flex><strong>justify-content</strong>\n' +
    '                            <md-radio-group ng-model="parent.justifyContent">\n' +
    '                                <md-radio-button value="flex-start" class="highlight">flex-start</md-radio-button>\n' +
    '                                <md-radio-button value="flex-end">flex-end</md-radio-button>\n' +
    '                                <md-radio-button value="center">center</md-radio-button>\n' +
    '                                <md-radio-button value="space-between">space-between</md-radio-button>\n' +
    '                                <md-radio-button value="space-around">space-around</md-radio-button>\n' +
    '                            </md-radio-group>\n' +
    '                        </div>\n' +
    '                        <div flex><strong>align-items</strong>\n' +
    '                            <md-radio-group ng-model="parent.alignItems">\n' +
    '                                <md-radio-button value="stretch" class="highlight">stretch</md-radio-button>\n' +
    '                                <md-radio-button value="flex-start">flex-start</md-radio-button>\n' +
    '                                <md-radio-button value="flex-end">flex-end</md-radio-button>\n' +
    '                                <md-radio-button value="center">center</md-radio-button>\n' +
    '                                <md-radio-button value="baseline">baseline</md-radio-button>\n' +
    '                            </md-radio-group>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div layout="row">\n' +
    '                        <div flex><strong>align-content</strong>\n' +
    '                            <md-radio-group ng-model="parent.alignContent">\n' +
    '                                <md-radio-button value="stretch" class="highlight">stretch</md-radio-button>\n' +
    '                                <md-radio-button value="flex-start">flex-start</md-radio-button>\n' +
    '                                <md-radio-button value="flex-end">flex-end</md-radio-button>\n' +
    '                                <md-radio-button value="center">center</md-radio-button>\n' +
    '                                <md-radio-button value="space-between">space-between</md-radio-button>\n' +
    '                                <md-radio-button value="space-around">space-around</md-radio-button>\n' +
    '                            </md-radio-group>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div><small>默认值已<span class="highlight">高亮</span>显示.</small>\n' +
    '                <md-divider></md-divider>\n' +
    '                <h3>弹性子元素属性 &ndash;<span class="highlight">flex items</span></h3>\n' +
    '                <div flex>\n' +
    '                    <table class="property">\n' +
    '                        <tr>\n' +
    '                            <th>属性</th>\n' +
    '                            <th>属性说明</th>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>order</td>\n' +
    '                            <td>控制弹性容器里子元素的顺序</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>flex-grow</td>\n' +
    '                            <td>设置弹性子元素的扩展比率</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>flex-shrink</td>\n' +
    '                            <td>设置弹性子元素的收缩比率</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>flex-basis</td>\n' +
    '                            <td>指定弹性子元素伸缩前的默认大小值，相当于width和height属性。</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>flex</td>\n' +
    '                            <td>flex-grow, flex-shrink和flex-basis属性的复合属性</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>align-self</td>\n' +
    '                            <td>允许独立的弹性子元素覆盖弹性容器的默认对齐设置(align-items)</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '                <md-divider hide show-sm show-md></md-divider>\n' +
    '            </div>\n' +
    '            <div flex>\n' +
    '                <h3 class="pull-left">实验场</h3>\n' +
    '                <p class="pull-right">\n' +
    '                    <md-button class="md-accent md-raised" ng-click="addChild()">添加元素</md-button>\n' +
    '                </p>\n' +
    '                <div class="clearfix"></div>\n' +
    '                <div class="flexbox-parent"\n' +
    '                    ng-attr-style="              -webkit-flex-direction:  {{parent.flexDirection}};              flex-direction:          {{parent.flexDirection}};              -webkit-flex-wrap:       {{parent.flexWrap}};              flex-wrap:               {{parent.flexWrap}};              -webkit-justify-content: {{parent.justifyContent}};              justify-content:         {{parent.justifyContent}};              -webkit-align-items:     {{parent.alignItems}};              align-items:             {{parent.alignItems}};              -webkit-align-content:   {{parent.alignContent}};              align-content:           {{parent.alignContent}};              ">\n' +
    '                    <div class="code md-whiteframe-z1" ng-repeat="child in children"\n' +
    '                        ng-attr-style="                width:               {{children_width}}%;                -webkit-order:       {{child.order}};                order:               {{child.order}};                -webkit-flex-grow:   {{child.flexGrow}};                flex-grow:           {{child.flexGrow}};                -webkit-flex-shrink: {{child.flexShrink}};                flex-shrink:         {{child.flexShrink}};                -webkit-flex-basis:  {{child.flexBasis}};                flex-basis:          {{child.flexBasis}};                -webkit-align-self:  {{child.alignSelf}};                align-self:          {{child.alignSelf}};              ">\n' +
    '                        <div class="clearfix"><span class="child-number" aria-label="Number">{{$index + 1}}</span><span\n' +
    '                                class="remove-child pull-right" ng-click="removeChild($index)" title="Remove">\n' +
    '                                &#x2716;</span></div>\n' +
    '                        <div class="child-controls">\n' +
    '                            <md-input-container>\n' +
    '                                <md-tooltip md-direction="top">order</md-tooltip><input type="number"\n' +
    '                                    ng-model="children[$index].order">\n' +
    '                            </md-input-container>\n' +
    '                            <md-input-container>\n' +
    '                                <md-tooltip md-direction="top">flex-grow</md-tooltip><input type="number"\n' +
    '                                    ng-model="children[$index].flexGrow">\n' +
    '                            </md-input-container>\n' +
    '                            <md-input-container>\n' +
    '                                <md-tooltip md-direction="top">flex-shrink</md-tooltip><input type="number"\n' +
    '                                    ng-model="children[$index].flexShrink">\n' +
    '                            </md-input-container>\n' +
    '                            <md-input-container>\n' +
    '                                <md-tooltip md-direction="top">flex-basis</md-tooltip><input type="text"\n' +
    '                                    ng-model="children[$index].flexBasis">\n' +
    '                            </md-input-container>\n' +
    '                            <md-input-container>\n' +
    '                                <md-tooltip md-direction="top">align-self</md-tooltip>\n' +
    '                                <md-select ng-model="children[$index].alignSelf">\n' +
    '                                    <md-option ng-value="value"\n' +
    '                                        ng-repeat="value in [\'auto\', \'flex-start\', \'flex-end\', \'center\', \'baseline\', \'stretch\']">\n' +
    '                                        {{value}}</md-option>\n' +
    '                                </md-select>\n' +
    '                            </md-input-container>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </md-content>\n' +
    '</body>\n' +
    '\n' +
    '</html>\n' +
    '<script src="https://i-ts.oss-cn-shenzhen.aliyuncs.com/vendor/flexbox/app.min.js"></script>';
