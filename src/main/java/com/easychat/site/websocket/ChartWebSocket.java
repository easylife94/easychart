package com.easychat.site.websocket;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.easychat.site.bot.Robot;
import com.easychat.site.common.Alias;
import com.easychat.site.model.SystemMessage;

@ServerEndpoint("/ws/chart")  
@Component  
public class ChartWebSocket {  
  
    private static int onlineCount = 0;  
  
    private static CopyOnWriteArraySet<ChartWebSocket> webSocketSet = new CopyOnWriteArraySet<ChartWebSocket>();  
    
    private static Map<String,ChartWebSocket> webSocketMap = new HashMap<String,ChartWebSocket>();
    private static Map<String,Alias> userAliasMap = new HashMap<String,Alias>();
    private static Set<Alias> aliasSet = new HashSet<Alias>();
    static{
    	String[] names = new String[]{
    			"宋江","卢俊义","吴用","公孙胜","关胜","林冲","秦明","呼延灼","花荣","柴进","李应","朱仝","鲁智深","武松","董平","张清","杨志","徐宁","索超","戴宗","刘唐","李逵","史进","穆弘","雷横","李俊","阮小二","张横","阮小五","张顺","阮小七","杨雄","石秀","解珍","解宝","燕青","朱武","黄信","孙立","宣赞","郝思文","韩滔","彭玘","单廷珪","魏定国","萧让","裴宣","欧鹏","邓飞","燕顺","杨林","凌振","蒋敬","吕方","郭 盛","安道全","皇甫端","王英","扈三娘","鲍旭","樊瑞","孔明","孔亮","项充","李衮","金大坚","马麟","童威","童猛","孟康","侯健","陈达","杨春","郑天寿","陶宗旺","宋清","乐和","龚旺","丁得孙","穆春","曹正","宋万","杜迁","薛永","施恩","周通","李忠","杜兴","汤隆","邹渊","邹润","朱富","朱贵","蔡福","蔡庆","李立","李云","焦挺","石勇","孙新","顾大嫂","张青","孙二娘","王定六","郁保四","白胜","时迁","段景柱"   			
    	};
    	for(String name : names){
    		Alias tmp = new Alias();
    		tmp.setName(name);
    		tmp.setUsed(false);
    		aliasSet.add(tmp);
    	}
    	
    }
    
    private String uuid;
    private Alias alias;
    private Session session; 
  
    @OnOpen  
    public void onOpen (Session session) throws IOException{  
        this.session = session;  
        this.uuid = UUID.randomUUID().toString();
       
        webSocketMap.put(uuid,this);
        
        ramdomALias();
        addOnlineCount();  
        
        SystemMessage sm = new SystemMessage();
        sm.setType(SystemMessage.TYPE_USER_JOIN);
        Map<String,Object> content = new HashMap<String,Object>();
        content.put("user",alias.getName());
        content.put("total", getOnlineCount());
        sm.setContent(content);
        
        JSONObject json = JSONObject.fromObject(sm);
       
        
       /* String sysMessage = alias.getName()+"加入聊天!当前在线人数为" + getOnlineCount();*/
        sendSysMessage(json.toString());
        
        System.out.println(json.toString());  
    }  
  
    @OnClose  
    public void onClose (){  
        webSocketMap.remove(this.uuid);
        subOnlineCount();  
        alias.setUsed(false);
        System.out.println("有一链接关闭!当前在线人数为" + getOnlineCount());  
    }  
  
    @OnMessage  
    public void onMessage (String message, Session session) throws IOException { 
    	
    	
    	if(message.contains("@bot")){
    		String response = Robot.response(message.replace("@bot", ""));
    		sendLoafBotMessage(response);
    	}else{
    		sendOthersMessage(message);
    	}
    	
    }  
    
    
    
    private synchronized void  ramdomALias(){
    	Iterator<Alias> it = aliasSet.iterator();
    	
    	while(true){
    		Alias tmp = it.next();
    		if(!tmp.isUsed()){
    			tmp.setUsed(true);
    			this.alias = tmp;
    			break;
    		}
    	}
    	
    }
    public void sendSysMessage (String message) throws IOException {  
    	// 群发系统消息  
        Set<String> keys =  webSocketMap.keySet();
        for(String uuid : keys){
        		ChartWebSocket socket = webSocketMap.get(uuid);
        		JSONObject sendMessageJSON = new JSONObject();
        		sendMessageJSON.element("from", "sys");
        		sendMessageJSON.element("type", "1");
        		sendMessageJSON.element("content", message);
        		sendMessageJSON.element("sender", "系统");
        		
        		socket.sendMessage(sendMessageJSON.toString());
        }
    }
    public void sendLoafBotMessage (String message) throws IOException {  
    	
		JSONObject sendMessageJSON = new JSONObject();
		sendMessageJSON.element("from", "bot");
		sendMessageJSON.element("type", "1");
		sendMessageJSON.element("content", message);
		sendMessageJSON.element("sender", "鸡气人");
		
		this.sendMessage(sendMessageJSON.toString());
        
    }
    public void sendOthersMessage (String message) throws IOException {  
    	 // 群发消息  
        Set<String> keys =  webSocketMap.keySet();
        for(String uuid : keys){
        	if(uuid!= this.uuid){
        		ChartWebSocket socket = webSocketMap.get(uuid);
        		JSONObject sendMessageJSON = new JSONObject();
        		sendMessageJSON.element("from", "user");
        		sendMessageJSON.element("type", "1");
        		sendMessageJSON.element("content", message);
        		sendMessageJSON.element("sender", alias.getName());
        		socket.sendMessage(sendMessageJSON.toString());
        	}
        }
    }  
    public void sendMessage (String message) throws IOException {  
        this.session.getBasicRemote().sendText(message);  
    }  
  
    public static synchronized  int getOnlineCount (){  
        return ChartWebSocket.onlineCount;  
    }  
  
    public static synchronized void addOnlineCount (){  
        ChartWebSocket.onlineCount++;  
    }  
  
    public static synchronized void subOnlineCount (){  
        ChartWebSocket.onlineCount--;  
    }  
  
}  